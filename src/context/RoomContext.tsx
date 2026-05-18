import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// Per-room state shape — in-memory only, never persisted.
// Architected so a future flag can swap useState for useLocalStorageState(roomId).
export type CustomItem = { id: string; text: string; checked: boolean };

export type TimeGridState = {
  interval: 15 | 30;
  startTime: string; // "HH:MM"
  rows: Record<string, { checked: boolean; note: string }>; // key = "HHMM"
};

export type RoomState = {
  checks: Record<string, boolean>;             // itemId -> checked
  blanks: Record<string, string>;              // `${itemId}:${blankLabel}` -> value
  customItems: Record<string, CustomItem[]>;   // categoryId -> items
  timeGrid: TimeGridState;
};

export const blankKey = (itemId: string, label: string) => `${itemId}:${label}`;

const EMPTY_ROOM: RoomState = {
  checks: {},
  blanks: {},
  customItems: {},
  timeGrid: { interval: 30, startTime: '18:30', rows: {} },
};

type Ctx = {
  currentRoomId: string;
  setCurrentRoomId: (id: string) => void;
  state: RoomState;
  setItemChecked: (itemId: string, checked: boolean) => void;
  setBlank: (itemId: string, label: string, value: string) => void;
  addCustomItem: (categoryId: string, text: string) => void;
  toggleCustomItem: (categoryId: string, customId: string) => void;
  removeCustomItem: (categoryId: string, customId: string) => void;
  setTimeGridInterval: (i: 15 | 30) => void;
  setTimeGridStartTime: (t: string) => void;
  setTimeRow: (hhmm: string, patch: Partial<{ checked: boolean; note: string }>) => void;
  resetCurrentRoom: () => void;
  hasAnyData: (roomId: string) => boolean;
};

const RoomCtx = createContext<Ctx | null>(null);

export function RoomProvider({ children, initialRoomId }: { children: ReactNode; initialRoomId: string }) {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId);
  const [rooms, setRooms] = useState<Record<string, RoomState>>({ [initialRoomId]: EMPTY_ROOM });

  const state = rooms[currentRoomId] ?? EMPTY_ROOM;

  const patchCurrent = useCallback(
    (patch: (prev: RoomState) => RoomState) => {
      setRooms((prev) => ({ ...prev, [currentRoomId]: patch(prev[currentRoomId] ?? EMPTY_ROOM) }));
    },
    [currentRoomId],
  );

  const setItemChecked = useCallback(
    (itemId: string, checked: boolean) =>
      patchCurrent((s) => ({ ...s, checks: { ...s.checks, [itemId]: checked } })),
    [patchCurrent],
  );

  const setBlank = useCallback(
    (itemId: string, label: string, value: string) =>
      patchCurrent((s) => ({ ...s, blanks: { ...s.blanks, [blankKey(itemId, label)]: value } })),
    [patchCurrent],
  );

  const addCustomItem = useCallback(
    (categoryId: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      patchCurrent((s) => {
        const list = s.customItems[categoryId] ?? [];
        const next: CustomItem = {
          id: `${categoryId}-${Date.now()}-${list.length}`,
          text: trimmed,
          checked: false,
        };
        return { ...s, customItems: { ...s.customItems, [categoryId]: [...list, next] } };
      });
    },
    [patchCurrent],
  );

  const toggleCustomItem = useCallback(
    (categoryId: string, customId: string) =>
      patchCurrent((s) => ({
        ...s,
        customItems: {
          ...s.customItems,
          [categoryId]: (s.customItems[categoryId] ?? []).map((it) =>
            it.id === customId ? { ...it, checked: !it.checked } : it,
          ),
        },
      })),
    [patchCurrent],
  );

  const removeCustomItem = useCallback(
    (categoryId: string, customId: string) =>
      patchCurrent((s) => ({
        ...s,
        customItems: {
          ...s.customItems,
          [categoryId]: (s.customItems[categoryId] ?? []).filter((it) => it.id !== customId),
        },
      })),
    [patchCurrent],
  );

  const setTimeGridInterval = useCallback(
    (i: 15 | 30) => patchCurrent((s) => ({ ...s, timeGrid: { ...s.timeGrid, interval: i } })),
    [patchCurrent],
  );

  const setTimeGridStartTime = useCallback(
    (t: string) => patchCurrent((s) => ({ ...s, timeGrid: { ...s.timeGrid, startTime: t } })),
    [patchCurrent],
  );

  const setTimeRow = useCallback(
    (hhmm: string, patch: Partial<{ checked: boolean; note: string }>) =>
      patchCurrent((s) => {
        const prev = s.timeGrid.rows[hhmm] ?? { checked: false, note: '' };
        return {
          ...s,
          timeGrid: {
            ...s.timeGrid,
            rows: { ...s.timeGrid.rows, [hhmm]: { ...prev, ...patch } },
          },
        };
      }),
    [patchCurrent],
  );

  const resetCurrentRoom = useCallback(() => {
    setRooms((prev) => ({ ...prev, [currentRoomId]: EMPTY_ROOM }));
  }, [currentRoomId]);

  const hasAnyData = useCallback(
    (roomId: string): boolean => {
      const s = rooms[roomId];
      if (!s) return false;
      return (
        Object.values(s.checks).some(Boolean) ||
        Object.values(s.blanks).some((v) => v.length > 0) ||
        Object.values(s.customItems).some((arr) => arr.length > 0) ||
        Object.values(s.timeGrid.rows).some((r) => r.checked || r.note.length > 0)
      );
    },
    [rooms],
  );

  const switchRoom = useCallback((id: string) => {
    setRooms((prev) => (prev[id] ? prev : { ...prev, [id]: EMPTY_ROOM }));
    setCurrentRoomId(id);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      currentRoomId,
      setCurrentRoomId: switchRoom,
      state,
      setItemChecked,
      setBlank,
      addCustomItem,
      toggleCustomItem,
      removeCustomItem,
      setTimeGridInterval,
      setTimeGridStartTime,
      setTimeRow,
      resetCurrentRoom,
      hasAnyData,
    }),
    [
      currentRoomId,
      switchRoom,
      state,
      setItemChecked,
      setBlank,
      addCustomItem,
      toggleCustomItem,
      removeCustomItem,
      setTimeGridInterval,
      setTimeGridStartTime,
      setTimeRow,
      resetCurrentRoom,
      hasAnyData,
    ],
  );

  return <RoomCtx.Provider value={value}>{children}</RoomCtx.Provider>;
}

export function useRoom(): Ctx {
  const ctx = useContext(RoomCtx);
  if (!ctx) throw new Error('useRoom must be used within a RoomProvider');
  return ctx;
}

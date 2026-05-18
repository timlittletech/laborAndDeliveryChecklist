import { ROOMS, ACTIVE_PILL_CLASSES } from '../data/rooms';
import { useRoom } from '../context/RoomContext';

export function RoomPicker() {
  const { currentRoomId, setCurrentRoomId, hasAnyData } = useRoom();

  return (
    <div
      className="max-w-[1100px] mx-auto mt-1.5 flex items-center gap-1.5 overflow-x-auto px-0.5 py-1"
      style={{ scrollbarWidth: 'none' }}
    >
      <span className="text-[0.65rem] font-bold text-lavender-700 uppercase tracking-[0.12em] whitespace-nowrap mr-0.5">
        Room
      </span>
      {ROOMS.map((room) => {
        const isActive = room.id === currentRoomId;
        const hasData = hasAnyData(room.id);
        return (
          <button
            key={room.id}
            type="button"
            title={room.name}
            aria-label={`Switch to ${room.name} room`}
            aria-pressed={isActive}
            onClick={() => setCurrentRoomId(room.id)}
            className={[
              'relative flex-shrink-0 w-10 h-10 rounded-xl border-[1.5px]',
              'inline-flex items-center justify-center p-0',
              'transition-all duration-200 hover:-translate-y-px',
              isActive
                ? `${ACTIVE_PILL_CLASSES[room.bg]} border-2 shadow-[0_2px_10px_rgba(155,140,212,0.22)] -translate-y-px`
                : 'bg-white border-line hover:border-lavender-200',
            ].join(' ')}
          >
            <span
              className={[
                'inline-block w-7 h-7 transition-transform',
                isActive ? 'scale-110' : '',
              ].join(' ')}
            >
              <room.Svg />
            </span>
            {hasData && (
              <span
                aria-hidden="true"
                className="absolute top-0.5 right-0.5 w-[7px] h-[7px] rounded-full bg-pink-500 border-[1.5px] border-white box-content"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

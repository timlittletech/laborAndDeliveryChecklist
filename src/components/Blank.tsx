import { useRoom } from '../context/RoomContext';
import { blankKey } from '../context/RoomContext';

type Props = {
  itemId: string;
  label: string;
  widthPx?: number;
};

export function Blank({ itemId, label, widthPx }: Props) {
  const { state, setBlank } = useRoom();
  const key = blankKey(itemId, label);
  const value = state.blanks[key] ?? '';
  return (
    <input
      type="text"
      className="ll-blank"
      placeholder={label}
      value={value}
      style={{ width: widthPx ? `${widthPx}px` : '90px' }}
      onChange={(e) => setBlank(itemId, label, e.target.value)}
    />
  );
}

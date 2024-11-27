import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";

import { statusType } from "./statusColumn";

type CardPropType = {
  id: string;
  status: statusType;
  title: string;
  isCardDeleted: boolean;
  setIsCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Card({ id, status, title }: CardPropType) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${status}_${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative group cursor-pointer flex"
      onClick={() => navigate(`${status}_${id}`)}
    >
      <div className="w-full flex bg-neutral-100 rounded-[0.5rem] shadow-sm px-4 py-2 mb-2 cursor-pointer hover:bg-neutral-200">
        {title}
      </div>
    </div>
  );
}

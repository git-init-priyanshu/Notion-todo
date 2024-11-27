import { Trash2 } from "lucide-react";
import { statusType } from "./status";
import getData from "@/helpers/getData";
import { DataType } from "@/App";
import addData from "@/helpers/addData";
import { useDraggable } from "@dnd-kit/core";
import { useRef } from "react";

type CardPropType = {
  id: string;
  status: statusType;
  title: string;
  isCardDeleted: boolean;
  setIsCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Card({
  id,
  status,
  title,
  isCardDeleted,
  setIsCardDeleted,
}: CardPropType) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${status}_${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const deleteCard = () => {
    const data: DataType[] = getData();

    const statusIndex = data.findIndex((item) => item.status === status);
    data[statusIndex].cards = data[statusIndex].cards.filter((e) => {
      return e.id !== id;
    });

    addData(data);
    setIsCardDeleted(true);
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative group cursor-pointer flex"
    >
      <div className="w-full flex bg-neutral-100 rounded-[0.5rem] shadow-sm px-4 py-2 mb-2 cursor-pointer hover:bg-neutral-200">
        {title}
        <Trash2
          size={20}
          strokeWidth={1}
          className="invisible group-hover:visible absolute right-2"
          onClick={deleteCard}
        />
      </div>
    </div>
  );
}

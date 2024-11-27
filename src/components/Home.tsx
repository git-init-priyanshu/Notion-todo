import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import updateCardStatus from "@/helpers/updateCardStatus";
import StatusColumn, { statusType, CardType } from "./statusColumn";

export const initialData: DataType[] = [
  {
    status: statusType.not_started,
    cards: [],
  },
  {
    status: statusType.in_progress,
    cards: [],
  },
  {
    status: statusType.completed,
    cards: [],
  },
];

export type DataType = {
  status: statusType;
  cards: CardType[] | [];
};
export default function Home() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isCardDeleted, setIsCardDeleted] = useState(false);
  const [isCardUpdated, setIsCardUdpated] = useState(false);
  const [data, setData] = useState<DataType[]>(initialData);

  useEffect(() => {
    const todoData = localStorage.getItem("todo-data");

    if (!todoData) return setData(initialData);
    setData(JSON.parse(todoData));
    setIsCardDeleted(false);
    setIsCardUdpated(false);
  }, [isAddingCard, isCardDeleted, isCardUpdated]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;
    const draggableId = active.id as string;
    const cardId = draggableId.split("_")[1];
    const prevStatus = draggableId.split("_")[0];
    const newStatus = over.id as statusType;

    updateCardStatus(cardId, prevStatus as statusType, newStatus);
    setIsCardUdpated(true);
  };

  return (
    <div className="flex gap-4 mx-20 mt-20 justify-evenly">
      <DndContext onDragEnd={handleDragEnd}>
        {data.map((e) => {
          return (
            <StatusColumn
              key={e.status}
              status={e.status}
              cards={e.cards}
              isAddingCard={isAddingCard}
              setIsAddingCard={setIsAddingCard}
              isCardDeleted={isCardDeleted}
              setIsCardDeleted={setIsCardDeleted}
              isCardUpdated={isCardUpdated}
            />
          );
        })}
      </DndContext>
    </div>
  );
}

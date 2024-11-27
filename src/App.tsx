import { useEffect, useState } from "react";
import "./App.css";

import Status, { statusType, CardType } from "./components/status";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import getData from "./helpers/getData";
import addData from "./helpers/addData";

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
function App() {
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

    const data: DataType[] = getData();

    // Deleting card data
    const prevStatusIndex = data.findIndex(
      (item) => item.status === prevStatus
    );
    const deletedCard = data[prevStatusIndex].cards.find((e) => {
      return e.id === cardId;
    });
    if (!deletedCard) return;

    data[prevStatusIndex].cards = data[prevStatusIndex].cards.filter((e) => {
      return e.id !== cardId;
    });
    console.log(deletedCard, data);

    // Updating card data
    const newStatusIndex = data.findIndex((item) => item.status === newStatus);
    data[newStatusIndex].cards = [...data[newStatusIndex].cards, deletedCard];

    addData(data);
    setIsCardUdpated(true);
  };

  return (
    <div className="flex gap-4 mx-20 mt-20 justify-evenly">
      <DndContext onDragEnd={handleDragEnd}>
        {data.map((e) => {
          return (
            <Status
              key={e.status}
              status={e.status}
              cards={e.cards}
              isAddingCard={isAddingCard}
              setIsAddingCard={setIsAddingCard}
              isCardDeleted={isCardDeleted}
              setIsCardDeleted={setIsCardDeleted}
            />
          );
        })}
      </DndContext>
    </div>
  );
}

export default App;

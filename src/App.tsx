import { useEffect, useState } from "react";
import "./App.css";

import Status, { statusType, CardType } from "./components/status";
import { DndContext } from "@dnd-kit/core";

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
  const [data, setData] = useState<DataType[]>(initialData);

  useEffect(() => {
    const todoData = localStorage.getItem("todo-data");

    if (!todoData) return setData(initialData);
    setData(JSON.parse(todoData));
    setIsCardDeleted(false);
  }, [isAddingCard, isCardDeleted]);

  return (
    <div className="flex gap-4 mx-20 mt-20 justify-evenly">
      <DndContext>
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

import { useState, useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";

import addNewCard from "@/helpers/addNewCard";
import Card from "./card";
import Status from "./status";
import { Input } from "./ui/input";
import { DataType } from "./Home";
import getData from "@/helpers/getData";

export enum statusType {
  not_started = "Not started",
  in_progress = "In progress",
  completed = "Completed",
}
export type CardType = {
  id: string;
  title: string;
  description: string;
};
type StatusColumnPropType = {
  status: statusType;
  cards: CardType[] | [];
  isAddingCard: boolean;
  setIsAddingCard: React.Dispatch<React.SetStateAction<boolean>>;
  isCardDeleted: boolean;
  setIsCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  isCardUpdated: boolean;
};
export default function StatusColumn({
  status,
  cards,
  isAddingCard,
  setIsAddingCard,
  isCardDeleted,
  setIsCardDeleted,
  isCardUpdated,
}: StatusColumnPropType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setNodeRef } = useDroppable({ id: status });

  const [newCardTitle, setNewCardTitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const data: DataType[] = getData();
    const statusIndex = data.findIndex((item) => item.status === status);

    const count = data[statusIndex].cards.length;
    setCount(count);
  }, [status, isAddingCard, isCardDeleted, isCardUpdated]);

  const addNewCardOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!inputRef.current || !newCardTitle) return;

    addNewCard(e.target.value, status);

    setNewCardTitle("");
    setIsAddingCard(false);
  };

  return (
    <div ref={setNodeRef} className="w-full p-2 min-w-[250px] rounded-[0.5rem] bg-neutral-50 mb-10">
      <Status status={status} />

      {cards.map((data) => {
        return (
          <Card
            key={data.id}
            id={data.id}
            status={status}
            title={data.title}
            isCardDeleted={isCardDeleted}
            setIsCardDeleted={setIsCardDeleted}
          />
        );
      })}

      <div
        className="relative flex gap-2 text-neutral-500 cursor-pointer rounded-lg mb-2"
        onClick={() => {
          setIsAddingCard(true);

          if (!inputRef.current) return;
          inputRef.current?.focus();
        }}
      >
        <Input
          ref={inputRef}
          onBlur={addNewCardOnBlur}
          className={`border-none outline-none rounded-[0.5rem] px-4 py-3 w-full h-full hover:bg-neutral-100`}
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="+ New"
        />
      </div>

      <div className="flex justify-end text-neutral-400">
        <p>Total: {count}</p>
      </div>
    </div>
  );
}

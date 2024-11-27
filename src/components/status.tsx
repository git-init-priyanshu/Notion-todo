import * as React from "react";
import Card from "./card";
import { v4 as uuid } from "uuid";
import { Input } from "./ui/input";
import getData from "@/helpers/getData";
import addData from "@/helpers/addData";
import { DataType } from "@/App";
import { DndContext, useDroppable } from "@dnd-kit/core";

export enum statusType {
  not_started = "Not started",
  in_progress = "In progress",
  completed = "Completed",
}
export type CardType = {
  id: string;
  status: statusType;
  title: string;
  description: string;
};
type StatusPropType = {
  status: statusType;
  cards: CardType[] | [];
  isAddingCard: boolean;
  setIsAddingCard: React.Dispatch<React.SetStateAction<boolean>>;
  isCardDeleted: boolean;
  setIsCardDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Status({
  status,
  cards,
  isAddingCard,
  setIsAddingCard,
  isCardDeleted,
  setIsCardDeleted,
}: StatusPropType) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { setNodeRef } = useDroppable({ id: status });

  const [newCardTitle, setNewCardTitle] = React.useState("");

  const getBgColor = () => {
    switch (status) {
      case statusType.not_started:
        return "bg-red";
      case statusType.in_progress:
        return "bg-blue";
      default:
        return "bg-green";
    }
  };

  const addNewCardOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!inputRef.current || !newCardTitle) return;
    const data: DataType[] = getData();

    const statusIndex = data.findIndex((item) => item.status === status);
    data[statusIndex].cards = [
      ...data[statusIndex].cards,
      { id: uuid(), status: status, title: e.target.value, description: "" },
    ];

    addData(data);
    setNewCardTitle("");
    setIsAddingCard(false);
  };

  return (
    <div ref={setNodeRef} className={` w-full p-2 rounded-[0.5rem]`}>
      <div className={`${getBgColor()}-300 w-fit px-2 rounded-[0.2rem] mb-2`}>
        {status}
      </div>

      {cards.map((data) => {
        return (
          <Card
            key={data.id}
            id={data.id}
            status={data.status}
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
    </div>
  );
}

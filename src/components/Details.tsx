import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleDashed, Trash } from "lucide-react";

import getData from "@/helpers/getData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDebounce from "@/helpers/useDebounce";
import updateCardStatus from "@/helpers/updateCardStatus";
import updateCardDetails from "@/helpers/updateCardDetails";
import deleteCard from "@/helpers/deleteCard";
import { DataType } from "./Home";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { statusType } from "./statusColumn";
import Status from "./status";

export default function Details() {
  const navigate = useNavigate();

  const { id } = useParams();
  const initialStatus = id?.split("_")[0];
  const cardId = id?.split("_")[1];

  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>(initialStatus || "");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const data: DataType[] = getData();

    const statusIndex = data.findIndex((item) => item.status === status);
    const cardData = data[statusIndex].cards.find((card) => {
      return card.id === cardId;
    });
    if (!cardData) return;

    setTitle(cardData.title);
    setDescription(cardData.description);
  }, []);

  const changeStatus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLDivElement;
    const newStatus = element.innerHTML;

    updateCardStatus(
      cardId as string,
      status as statusType,
      newStatus as statusType
    );

    setStatus(newStatus);
  };

  const debounce = useDebounce(
    () =>
      updateCardDetails(
        cardId as string,
        status as statusType,
        title,
        description
      ),
    1000
  );

  return (
    <div className="mx-20 mt-20">
      <div className="flex w-full justify-between">
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            debounce(e.target.value);
          }}
          className="border-none outline-none font-bold h-max mb-8"
          style={{ fontSize: "3rem" }}
        />
        <Button
          variant="outline"
          className="group border-red-300 hover:bg-red-100 rounded-[0.3rem]"
          onClick={() => {
            deleteCard(cardId as string, status as statusType);
            navigate("/");
          }}
        >
          <p className="group-hover:text-red-500">Delete</p>
          <Trash className="group-hover:text-red-500" />
        </Button>
      </div>
      <div>
        <div className="flex w-full max-w-80 justify-between">
          <p className="flex gap-2">
            <CircleDashed /> Status
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Status status={status as statusType} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-min">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => changeStatus(e)}
              >
                <Status status={statusType.not_started} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => changeStatus(e)}
              >
                <Status status={statusType.in_progress} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => changeStatus(e)}
              >
                <Status status={statusType.completed} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="h-px bg-neutral-300 w-full my-10"></div>
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
            debounce(e.target.value);
          }}
          className="outline-none border-none w-full resize-none min-h-[50vh]"
        />
      </div>
    </div>
  );
}

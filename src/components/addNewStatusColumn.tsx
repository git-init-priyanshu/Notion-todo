import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { DataType } from "./Home";
import getData from "@/helpers/getData";
import setData from "@/helpers/setData";
import { statusType } from "./statusColumn";

type AddNewStatusColumnPropType = {
  isAddingNewStatus: boolean;
  setIsAddingNewStatus: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddNewStatusColumn({
  isAddingNewStatus,
  setIsAddingNewStatus,
}: AddNewStatusColumnPropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [statusName, setStatusName] = useState("");

  const saveNewStatusOnBlur = () => {
    setIsAddingNewStatus(false);

    if (!statusName) return;
    const data: DataType[] = getData();

    data.push({
      status: statusName as statusType,
      cards: [],
    });

    setData(data);
    setStatusName("");
  };
  return (
    <div
      onClick={() => {
        setIsAddingNewStatus(true);
      }}
    >
      {isAddingNewStatus ? (
        <div>
          <Input
            ref={inputRef}
            placeholder="New status"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            onBlur={saveNewStatusOnBlur}
            className="bg-sky-400 border-none outline-none shadow-md rounded-[0.3rem] min-w-[250px]"
          />
        </div>
      ) : (
        <div className="hover:bg-neutral-200 h-fit cursor-pointer rounded-[0.2rem] p-2 text-neutral-500">
          <Plus />
        </div>
      )}
    </div>
  );
}

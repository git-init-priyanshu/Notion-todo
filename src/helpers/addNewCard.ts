import { v4 as uuid } from "uuid";

import { DataType } from "@/components/Home";
import { statusType } from "@/components/statusColumn";
import getData from "./getData";
import setData from "./setData";

export default function addNewCard(title: string, status: statusType) {
  const data: DataType[] = getData();

  const statusIndex = data.findIndex((item) => item.status === status);
  data[statusIndex].cards = [
    ...data[statusIndex].cards,
    { id: uuid(), title: title, description: "" },
  ];

  setData(data);
}

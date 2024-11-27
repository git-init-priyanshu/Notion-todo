import { DataType } from "@/components/Home";
import { statusType } from "@/components/statusColumn";
import getData from "./getData";
import setData from "./setData";

export default function deleteCard(cardId: string, status: statusType) {
  const data: DataType[] = getData();

  const statusIndex = data.findIndex((item) => item.status === status);
  data[statusIndex].cards = data[statusIndex].cards.filter((card) => {
    return card.id !== cardId;
  });

  setData(data);
}

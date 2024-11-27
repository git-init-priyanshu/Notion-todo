import { DataType } from "@/components/Home";
import { statusType } from "@/components/statusColumn";
import getData from "./getData";
import setData from "./setData";

export default function updateCardStatus(
  cardId: string,
  prevStatus: statusType,
  newStatus: statusType
) {
  const data: DataType[] = getData();

  // Deleting card data
  const prevStatusIndex = data.findIndex((item) => item.status === prevStatus);
  const deletedCard = data[prevStatusIndex].cards.find((e) => {
    return e.id === cardId;
  });
  if (!deletedCard) return;

  data[prevStatusIndex].cards = data[prevStatusIndex].cards.filter((e) => {
    return e.id !== cardId;
  });

  // Updating card data
  const newStatusIndex = data.findIndex((item) => item.status === newStatus);
  data[newStatusIndex].cards = [...data[newStatusIndex].cards, deletedCard];

  setData(data);
}

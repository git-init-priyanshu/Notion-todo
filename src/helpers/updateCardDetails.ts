import { DataType } from "@/components/Home";
import getData from "./getData";
import { statusType } from "@/components/statusColumn";
import setData from "./setData";

export default function updateCardDetails(
  cardId: string,
  currentStatus: statusType,
  title: string,
  description: string
) {
  const data: DataType[] = getData();

  const statusIndex = data.findIndex((item) => item.status === currentStatus);
  const cardIndex = data[statusIndex].cards.findIndex(
    (card) => card.id === cardId
  );

  data[statusIndex].cards.splice(cardIndex, 1, {
    id: cardId,
    title,
    description,
  });

  setData(data);
}

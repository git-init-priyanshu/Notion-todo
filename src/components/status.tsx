import { statusType } from "./statusColumn";

export default function Status({ status }: { status: statusType }) {
  const getBgColor = () => {
    switch (status) {
      case statusType.not_started:
        return "bg-red-300";
      case statusType.in_progress:
        return "bg-blue-300";
      case statusType.completed:
        return "bg-green-300";
      default:
        return "bg-neutral-300";
    }
  };

  return (
    <div className={`${getBgColor()} w-fit px-2 rounded-[0.2rem] mb-2`}>
      {status}
    </div>
  );
}

import { initialData } from "@/App";

export default function getData() {
  return JSON.parse(localStorage.getItem("todo-data") || JSON.stringify(initialData));
}

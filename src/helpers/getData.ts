import { initialData } from "@/App";

export default function getData() {
  console.log("here");
  return JSON.parse(localStorage.getItem("todo-data") || JSON.stringify(initialData));
}

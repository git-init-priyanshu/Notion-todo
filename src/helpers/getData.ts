import { initialData } from "../components/Home";

export default function getData() {
  return JSON.parse(localStorage.getItem("todo-data") || JSON.stringify(initialData));
}

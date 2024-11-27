import { DataType } from "@/App";

export default function addData(data:DataType[]){
    localStorage.setItem("todo-data", JSON.stringify(data));
}
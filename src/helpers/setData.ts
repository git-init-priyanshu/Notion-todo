import { DataType } from "@/components/Home";

export default function setData(data:DataType[]){
    localStorage.setItem("todo-data", JSON.stringify(data));
}
import { FC } from "react";
import SortableItem from "./SortableItem";
import { AiOutlinePlus } from "react-icons/ai";
import { ItemField, Task } from "../types";

interface SortableListProps {
  items: Task[];
  id: string;
  itemField: ItemField;
}

const ListOfItems: FC<SortableListProps> = ({ items, id, itemField }) => {
  return (
    <>
      {items.length ? (
        items.map((item, index) => (
          <SortableItem key={index} item={item} id={id} itemField={itemField} />
        ))
      ) : (
        <div className=" flex justify-center items-center">
          <AiOutlinePlus className="text-white w-8 h-8" />
        </div>
      )}
    </>
  );
};

export default ListOfItems;

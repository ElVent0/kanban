import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";
import { AiOutlinePlus } from "react-icons/ai";
import { getColor } from "../utils/index";
import { Task } from "../interfaces/task";

interface SortableListProps {
  items: Task[];
  id: string;
}

const SortableList: FC<SortableListProps> = ({ items, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul className={`w-64 mr-4 p-2 border  bg-${getColor(id)}-400 rounded-xl`}>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <SortableItem key={index} item={item} id={id} />
            ))
          ) : (
            <div className="h-20 flex justify-center items-center">
              <AiOutlinePlus className="text-white w-8 h-8" />
            </div>
          )}
        </div>
      </SortableContext>
    </ul>
  );
};

export default SortableList;
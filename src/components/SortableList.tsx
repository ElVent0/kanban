import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

interface SortableListProps {
  items: Task[];
  id: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

const SortableList: FC<SortableListProps> = ({ items, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul className="w-64 mr-4 p-2 border  bg-indigo-400 rounded-md">
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.map((item, index) => (
            <SortableItem key={index} item={item} />
          ))}
        </div>
      </SortableContext>
    </ul>
  );
};

export default SortableList;

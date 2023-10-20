import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface SortableItemProps {
  item: Task;
}

const SortableItem: FC<SortableItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="text-lg bg-gray-50 rounded-md px-4 py-1.5 mb-2 last-of-type:mb-0"
    >
      {props.item.id}
      {props.item.title}
      {props.item.description}
      {props.item.status}
      {props.item.priority}
    </li>
  );
};

export default SortableItem;

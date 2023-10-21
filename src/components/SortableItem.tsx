import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import { getColor } from "../utils/index";
import { Task } from "../interfaces/task";

interface SortableItemProps {
  item: Task;
  id: string;
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
      className={`text-lg bg-gray-50 hover:bg-${getColor(
        props.id
      )}-100 rounded-lg p-3 mb-2  last-of-type:mb-0 relative`}
    >
      <p className="font-semibold mb-2">
        {props.item.title}
        <span
          className={`font-normal ml-3 bg-${getColor(
            props.id
          )}-100 rounded-lg px-2 py-1 text-sm text-gray-600`}
        >
          {props.item.status}
        </span>
      </p>
      <p>{props.item.description}</p>
    </li>
  );
};

export default SortableItem;

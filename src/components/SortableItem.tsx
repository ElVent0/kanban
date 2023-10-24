import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import { getLightColor } from "../utils/index";
import { Task } from "../types/task";

interface SortableItemProps {
  item: Task;
  id: string;
  itemField: keyof Task;
}

const SortableItem: FC<SortableItemProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(1234, props.item.status, props.item[props.itemField]);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`text-lg bg-gray-50  rounded-lg p-3 mb-2  last-of-type:mb-0 relative`}
    >
      <p className="font-semibold mb-2">
        {props.item.title}
        <span
          className={`font-normal ml-3 rounded-lg px-2 py-1 text-sm text-gray-600`}
          style={{ backgroundColor: getLightColor(props.id) }}
        >
          {props.item[props.itemField]}
        </span>
      </p>
      <p>{props.item.description}</p>
    </li>
  );
};

export default SortableItem;

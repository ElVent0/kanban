import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { getColor } from "../utils/index";
import { ItemField, Task } from "../types";
import ListOfItems from "./ListOfItems";

interface SortableListProps {
  items: Task[];
  id: string;
  itemField: ItemField;
}

const SortableList: FC<SortableListProps> = ({ items, id, itemField }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul
      className={`w-64 mr-4 p-2 border rounded-xl`}
      style={{ backgroundColor: getColor(id) }}
    >
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {!items.length ? (
          <div ref={setNodeRef}>
            <ListOfItems items={items} id={id} itemField={itemField} />
          </div>
        ) : (
          <>
            <ListOfItems items={items} id={id} itemField={itemField} />
          </>
        )}
      </SortableContext>
    </ul>
  );
};

export default SortableList;

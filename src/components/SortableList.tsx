import { FC } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";
import { AiOutlinePlus } from "react-icons/ai";
import { getColor } from "../utils/index";
import { ItemField, Task } from "../types";

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
      className={`w-64 mr-4 p-2 border rounded-xl `}
      style={{ backgroundColor: getColor(id) }}
    >
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {!items.length ? (
          <div ref={setNodeRef}>
            {items.length ? (
              items.map((item, index) => (
                <SortableItem
                  key={index}
                  item={item}
                  id={id}
                  itemField={itemField}
                />
              ))
            ) : (
              <div className="h-20 flex justify-center items-center">
                <AiOutlinePlus className="text-white w-8 h-8" />
              </div>
            )}
          </div>
        ) : (
          <>
            {items.length ? (
              items.map((item, index) => (
                <SortableItem
                  key={index}
                  item={item}
                  id={id}
                  itemField={itemField}
                />
              ))
            ) : (
              <div className="h-20 flex justify-center items-center">
                <AiOutlinePlus className="text-white w-8 h-8" />
              </div>
            )}
          </>
        )}
      </SortableContext>
    </ul>
  );
};

export default SortableList;

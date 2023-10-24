import { FC } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import { useGetItems } from "../hooks/useGetItems";
import { DragAndDropProps } from "../types/dragAndDropProps";

const DragAndDrop: FC<DragAndDropProps> = ({
  columns,
  itemField,
  itemsOriginal,
  onChangeOver,
  onChangeEnd,
}) => {
  const { items, setItems } = useGetItems({
    columns,
    itemsOriginal,
    itemField,
  });
  const sensors = useDefaultSensors();

  return (
    <div className="p-10 h-screen bg-white text-gray-800 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => onChangeOver(event, setItems, items)}
        onDragEnd={(event) =>
          onChangeEnd(event, items, setItems, arrayMove, itemField)
        }
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => {
            return (
              <div key={index}>
                <p className="mb-2 text-gray-800 font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <SortableList items={value} id={key} itemField={itemField} />
              </div>
            );
          })}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;

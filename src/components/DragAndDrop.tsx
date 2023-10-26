import { FC } from "react";
import {
  DndContext,
  closestCenter,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import { useGetItems } from "../hooks/useGetItems";
import { ItemField, Task } from "../types";

type ItemsType = Record<string, Task[]>;

export interface DragAndDropProps {
  columns: string[];
  itemField: ItemField;
  itemsOriginal: Task[];
  onChangeOver: (
    event: DragOverEvent,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    items: ItemsType
  ) => void;
  onChangeEnd: (
    event: DragEndEvent,
    items: ItemsType,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    arrayMove: (arr: Task[], from: number, to: number) => Task[],
    itemField: ItemField
  ) => void;
}

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
    <div className="p-10 bg-white text-gray-800 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => onChangeOver(event, setItems, items ?? {})}
        onDragEnd={(event) =>
          onChangeEnd(event, items as ItemsType, setItems, arrayMove, itemField)
        }
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => {
            return (
              <div key={index} className="min-h-full">
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

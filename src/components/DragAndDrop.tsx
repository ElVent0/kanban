import { FC } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { handleDragOver, handleDragEnd } from "../utils/index";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import { useGetItems } from "../hooks/useGetItems";
// import { Task } from "../interfaces/task";

// type Items = Record<string, Task[]>;

const DragAndDrop: FC = () => {
  // Щодо пріоритетності. В об'єкті, що було запропоновано завданням, були
  // елементи з однаковою пріоритетністю в межах одного списку. Тому тільки
  // на етапі "монтажу" відсортував за пріоритетністю (без можливості змінювати
  // її при перетягуванні)

  const { items, setItems } = useGetItems();
  const sensors = useDefaultSensors();

  return (
    <div className="p-10 h-screen bg-white text-gray-800 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => handleDragOver(event, setItems, items)}
        onDragEnd={(event) => handleDragEnd(event, items, setItems, arrayMove)}
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => {
            return (
              <div key={index}>
                <p className="mb-2 text-gray-800 font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <SortableList items={value} id={key} />
              </div>
            );
          })}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;

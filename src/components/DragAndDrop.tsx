import { FC, useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { handleDragOver, handleDragEnd } from "../utils/handleDrag";
import { useDefaultSensors } from "../hooks/useDefaultSensors";
import array from "../data/data.json";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

// const a: Task[] = array;

const DragAndDrop: FC = () => {
  const [items, setItems] = useState<Record<string, Task[]>>();
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    const getStatuses = () => {
      const statuses: string[] = [];
      array.map((item) => statuses.push(item.status));
      const resultStatuses: string[] = statuses.filter(
        (item, index, array) => array.indexOf(item) === index
      );
      setStatuses(resultStatuses);

      const resultItems: Record<string, Task[]> = {};
      resultStatuses.forEach((item) => (resultItems[item] = []));
      array.forEach((item) => {
        resultItems[item.status].push({
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
          priority: item.priority,
        });
      });

      console.log(1, resultItems, resultStatuses);

      setItems(resultItems);
    };
    getStatuses();
  }, []);

  console.log("STATES", items, statuses);
  // console.log(statuses);

  // const [items, setItems] = useState<Record<string, string[]>>({
  //   numbers: ["First", "Second", "Third", "Fourth", "Fifth"],
  //   colors: ["Blue", "Yellow", "Red", "Green", "Black"],
  //   days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  // });

  // {
  //     "id": 2,
  //     "title": "Task #2",
  //     "description": "Description task #2",
  //     "status": "open",
  //     "priority": "P1"
  //   }

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
          Object.entries(items).map(([key, value], index) => (
            <div key={index}>
              <p className="mb-2 text-indigo-800 font-semibold">
                {value[0].status.charAt(0).toUpperCase() +
                  value[0].status.slice(1)}
              </p>
              <SortableList items={value} id={key} />
            </div>
          ))}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;

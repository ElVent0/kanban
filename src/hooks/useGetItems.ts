import { useEffect, useState } from "react";
// import array from "../data/data.json";
import { Task } from "../types/task";

interface UseGetItemsProps {
  columns: string[];
  itemsOriginal: Task[];
  itemField: keyof Task;
}

export const useGetItems = ({
  columns,
  itemsOriginal: array,
  itemField,
}: UseGetItemsProps) => {
  const [items, setItems] = useState<Record<string, Task[]>>();

  const [statuses] = useState<string[]>(columns);

  useEffect(() => {
    const getItems = () => {
      const newArray = array.sort((a, b) => a.priority - b.priority);

      const resultItems: Record<string, Task[]> = {};
      statuses.forEach((item) => (resultItems[item] = []));
      newArray.forEach((item) => {
        resultItems[item[itemField]].push(item);
      });

      setItems(resultItems);
    };
    getItems();
  }, [array, itemField, statuses]);

  return { items, setItems };
};

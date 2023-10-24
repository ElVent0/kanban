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
      // setItems(array.filter((item) => item[itemField] === ));

      // let defaultItems = {};
      // for (const key of columns) {
      //   (defaultItems as Record<string, Task[]>)[key] = array.filter(
      //     (item) => key === (item as Task)[itemField]
      //   );
      // }

      array.map((item) => statuses.push(item[itemField] as string));
      const newArray = array.sort((a, b) => a.priority - b.priority);
      const resultStatuses: string[] = statuses.filter(
        (item, index, newArray) => newArray.indexOf(item) === index
      );

      const resultItems: Record<string, Task[]> = {};
      resultStatuses.forEach((item) => (resultItems[item] = []));
      newArray.forEach((item) => {
        const newItem = {
          id: item.id,
          title: item.title,
          description: item.description,
          status: item[itemField],
          priority: item.priority,
          // [item[itemField]]: item[itemField] as string,
        };
        resultItems[item[itemField]].push(newItem);
      });

      setItems(resultItems);
    };
    getItems();
  }, [array, itemField, statuses]);

  return { items, setItems };
};

import { useEffect, useState } from "react";
import array from "../data/data.json";
import { Task } from "../interfaces/task";

export const useGetItems = () => {
  const [items, setItems] = useState<Record<string, Task[]>>();

  // Статуси захардкодив, бо їх черговість не можна визначати на
  // фронті(за умовою списки, що приходять з беку, можуть змінюватись)
  const [statuses] = useState<string[]>([
    "planned",
    "open",
    "in-progress",
    "done",
  ]);

  useEffect(() => {
    const getItems = () => {
      array.map((item) => statuses.push(item.status));
      const newArray = array.sort((a, b) => a.priority - b.priority);
      const resultStatuses: string[] = statuses.filter(
        (item, index, newArray) => newArray.indexOf(item) === index
      );

      const resultItems: Record<string, Task[]> = {};
      resultStatuses.forEach((item) => (resultItems[item] = []));
      newArray.forEach((item) => {
        resultItems[item.status].push({
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
          priority: item.priority,
        });
      });

      setItems(resultItems);
    };
    getItems();
  }, [statuses]);

  return { items, setItems };
};

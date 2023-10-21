import { DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { Task } from "../interfaces/task";

type Items = Record<string, Task[]>;

export const handleDragOver = (
  event: DragOverEvent,
  setItems: React.Dispatch<
    React.SetStateAction<Record<string, Task[]> | undefined>
  >,
  items: Items | undefined
): void => {
  const { active, over, activatorEvent } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;
  if (!items) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setItems((prev) => {
    if (prev) {
      const activeItems = prev[activeContainer] || [];
      const overItems = prev[overContainer] || [];

      console.log(overId);

      const activeIndex = activeItems.filter((item) => item.id === id)[0].id;

      let overIndex = 0;
      if (typeof overId === "number") {
        overIndex =
          overItems.length > 0 && !isNaN(overId)
            ? overItems.filter((item) => item.id === overId)[0].id
            : -1;
      }

      // const overIndex =
      //   overItems.length > 0 && !isNaN(overId)
      //     ? overItems.filter((item) => item.id === overId)[0].id
      //     : -1;

      let newIndex: number;
      if (overId in prev) {
        newIndex = overItems.length;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          (activatorEvent as MouseEvent).offsetY > 0;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      const objectWithOurIndex = items[activeContainer].filter(
        (item) => item.id === activeIndex
      );

      return {
        ...prev,
        [activeContainer]: [...activeItems.filter((item) => item.id !== id)],
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          items[activeContainer][
            items[activeContainer].indexOf(objectWithOurIndex[0])
          ],
          ...overItems.slice(newIndex, overItems.length),
        ],
      };
    }
  });
};

export const handleDragEnd = (
  event: DragEndEvent,
  items: Items | undefined,
  setItems: React.Dispatch<
    React.SetStateAction<Record<string, Task[]> | undefined>
  >,
  arrayMove: (arr: Task[], from: number, to: number) => Task[]
): void => {
  const { active, over } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;
  if (!items) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  // if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  const activeIndex = (items[activeContainer] || []).filter(
    (item) => item.id === id
  )[0].id;
  const overIndex = items[overContainer].indexOf(
    (items[overContainer] || []).filter((item) => item.id === overId)[0]
  );

  const objectWithOurIndex = items[activeContainer].filter(
    (item) => item.id === activeIndex
  );

  const newArray = (prevItems: Items) => {
    const resultArray = prevItems[overContainer].map((item, index) => {
      if (index === prevItems[activeContainer].indexOf(objectWithOurIndex[0])) {
        const newItem = { ...item };
        newItem.status = overContainer;
        return newItem;
      } else {
        return item;
      }
    });

    return resultArray;
  };

  if (activeIndex !== overIndex) {
    setItems((prevItems) => {
      if (prevItems) {
        return {
          ...prevItems,
          [overContainer]: arrayMove(
            newArray(prevItems) || [],
            prevItems[activeContainer].indexOf(objectWithOurIndex[0]),
            overIndex
          ),
        };
      }
    });
  }
};
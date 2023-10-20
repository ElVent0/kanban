import { DragOverEvent, DragEndEvent } from "@dnd-kit/core";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

type Items = Record<string, Task[]>;

export const handleDragOver = (
  event: DragOverEvent,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
  items: Items
): void => {
  const { active, over, activatorEvent } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setItems((prev) => {
    const activeItems = prev[activeContainer] || [];
    const overItems = prev[overContainer] || [];

    // const activeIndex = activeItems.indexOf(String(id));
    // const overIndex = overItems.indexOf(String(overId));
    const activeIndex = activeItems.filter((item) => item.id === id)[0].id;
    const overIndex = overItems.filter((item) => item.id === overId)[0].id;

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

    // console.log("--------------------", activeContainer, activeIndex);

    const objectWithOurIndex = items[activeContainer].filter(
      (item) => item.id === activeIndex
    );

    // console.log("==============", items, {
    //   ...prev,
    //   [activeContainer]: [...activeItems.filter((item) => item.id !== id)],
    //   [overContainer]: [
    //     ...overItems.slice(0, newIndex),
    //     items[activeContainer][
    //       items[activeContainer].indexOf(objectWithOurIndex[0])
    //     ],
    //     ...overItems.slice(newIndex, overItems.length),
    //   ],
    // });

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
  });
};

export const handleDragEnd = (
  event: DragEndEvent,
  items: Items,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
  arrayMove: (arr: Task[], from: number, to: number) => string[]
): void => {
  const { active, over } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  // if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  // const activeIndex = (items[activeContainer] || []).indexOf(String(id));
  // const overIndex = (items[overContainer] || []).indexOf(String(overId));
  const activeIndex = (items[activeContainer] || []).filter(
    (item) => item.id === id
  )[0].id;
  const overIndex = items[overContainer].indexOf(
    (items[overContainer] || []).filter((item) => item.id === overId)[0]
  );

  const objectWithOurIndex = items[activeContainer].filter(
    (item) => item.id === activeIndex
  );

  // console.log(
  //   "========",
  //   items[overContainer],
  //   items[activeContainer],
  //   activeIndex,
  //   overIndex,
  //   {
  //     ...items,
  //     [overContainer]: arrayMove(
  //       items[overContainer] || [],
  //       activeIndex,
  //       overIndex
  //     ),
  //   }
  // );

  if (activeIndex !== overIndex) {
    setItems((prevItems) => ({
      ...prevItems,
      [overContainer]: arrayMove(
        prevItems[overContainer] || [],
        items[activeContainer].indexOf(objectWithOurIndex[0]),
        overIndex
      ),
    }));
  }
};

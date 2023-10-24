import { DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { Task } from "../types/task";

type Items = Record<string, Task[]>;

export interface DragAndDropProps {
  columns: string[];
  itemField: string;
  itemsOriginal: Task[];
  onChangeOver: (
    event: DragOverEvent,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    items: Items | undefined
  ) => void;
  onChangeEnd: (
    event: DragEndEvent,
    items: Items | undefined,
    setItems: React.Dispatch<
      React.SetStateAction<Record<string, Task[]> | undefined>
    >,
    arrayMove: (arr: Task[], from: number, to: number) => Task[],
    itemField: string
  ) => void;
}

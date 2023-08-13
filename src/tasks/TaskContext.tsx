import { createContext } from "react";

import { Database } from "@/database.types";
export const filters = ["All", "Active", "Completed"] as const;
export type Filter = (typeof filters)[number];
export type ITask = Database["public"]["Tables"]["tasks"]["Row"];
export type ITaskInput = Database["public"]["Tables"]["tasks"]["Insert"];

export interface TaskContextInterface {
  allTasks: ITask[];
  addTask: (task: Pick<ITask, "completed" | "title">) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  setActiveFilter: (filter: Filter) => void;
  clearCompleted: () => void;
  activeFilter: Filter;
}

export const TaskContext = createContext<TaskContextInterface>({
  allTasks: [],
  addTask: () => {},
  removeTask: () => {},
  toggleTask: () => {},
  setActiveFilter: () => {},
  clearCompleted: () => {},
  activeFilter: "All",
});

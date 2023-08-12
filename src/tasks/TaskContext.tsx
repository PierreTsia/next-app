import { createContext } from "react";
export const filters = ["All", "Active", "Completed"] as const;
export type Filter = (typeof filters)[number];
export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskContextInterface {
  allTasks: ITask[];
  addTask: (task: ITask) => void;
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

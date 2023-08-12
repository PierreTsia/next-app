import { useContext } from "react";
import { TaskContext } from "@/src/tasks/TaskContext";

export const useTasks = () => {
  const {
    allTasks,
    addTask,
    removeTask,
    toggleTask,
    activeFilter,
    setActiveFilter,
    clearCompleted,
  } = useContext(TaskContext);

  const activeTasks = allTasks.filter((task) => !task.completed);
  const doneTasks = allTasks.filter((task) => task.completed);

  const filteredTasks = {
    All: allTasks,
    Active: activeTasks,
    Completed: doneTasks,
  };

  const displayedTasks = filteredTasks[activeFilter];

  const isActive = (filter: string) => filter === activeFilter;

  return {
    removeTask,
    toggleTask,
    addTask,
    allTasks,
    doneTasks,
    activeTasks,
    displayedTasks,
    setActiveFilter,
    isActive,
    clearCompleted,
  };
};

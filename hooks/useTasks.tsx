import { useContext } from "react";
import { TaskContext } from "@/src/tasks/TaskContext";
export const POSITION_INCREMENT = 1000000000;
export const useTasks = () => {
  const {
    allTasks,
    addTask,
    removeTask,
    toggleTask,
    activeFilter,
    setActiveFilter,
    clearCompleted,
    updateTask,
  } = useContext(TaskContext);

  const activeTasks = allTasks.filter((task) => !task.completed);
  const doneTasks = allTasks.filter((task) => task.completed);

  const filteredTasks = {
    All: allTasks,
    Active: activeTasks,
    Completed: doneTasks,
  };

  const displayedTasks = filteredTasks[activeFilter];

  const newTaskPosition = (
    destinationIndex: number,
    activeFiler: "All" | "Active" | "Completed",
    directionOffset: 1 | -1,
  ) => {
    const tasks = filteredTasks[activeFiler];

    if (destinationIndex === 0) {
      return tasks.length
        ? Math.round(tasks[0].position! / 2)
        : POSITION_INCREMENT;
    } else if (destinationIndex === tasks.length - 1) {
      return Math.round(tasks[tasks.length - 1].position! + POSITION_INCREMENT);
    } else {
      // Ensure you don't go out of bounds when accessing tasks array
      const adjacentIndex = Math.min(
        Math.max(destinationIndex + directionOffset, 0),
        tasks.length - 1,
      );

      const gap =
        tasks[adjacentIndex].position! - tasks[destinationIndex].position!;
      return Math.round(tasks[destinationIndex].position! + gap / 2);
    }
  };

  const taskByIndex = (
    index: number,
    activeFiler: "All" | "Active" | "Completed",
  ) => {
    const tasks = filteredTasks[activeFiler];
    return tasks[index];
  };

  const isActive = (filter: string) => filter === activeFilter;

  return {
    removeTask,
    toggleTask,
    updateTask,
    addTask,
    allTasks,
    doneTasks,
    activeTasks,
    activeFilter,
    displayedTasks,
    setActiveFilter,
    isActive,
    newTaskPosition,
    clearCompleted,
    taskByIndex,
  };
};

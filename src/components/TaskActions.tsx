"use client";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { Filter, filters } from "@/src/tasks/TaskContext";

const TaskFilter = ({ filter }: { filter: Filter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveFilter, isActive } = useTasks();

  const filterClasses = () => {
    let classes = ["cursor-pointer p-4"];

    if (isHovered) {
      classes.push("text-textColor", "font-bold");
    }

    if (isActive(filter)) {
      classes.push("text-blue-600", "font-bold", "underline");
    }

    return classes.join(" ");
  };

  return (
    <li
      key={filter}
      className={filterClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </li>
  );
};

const ClearCompletedButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { clearCompleted } = useTasks();
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={clearCompleted}
      className={`cursor-pointer p-4 ${
        isHovered ? "text-textColor font-bold" : ""
      }`}
    >
      Clear completed
    </span>
  );
};

export const TaskActions = () => {
  const { activeTasks } = useTasks();

  return (
    <div className="flex justify-between items-center w-full bg-bgContent p-6 text-gray-500 dark:text-gray-400 text-sm">
      <span className={"pl-2"}>{activeTasks.length} items left</span>
      <ul className={"flex gap-x-4"}>
        {filters.map((filter, i) => (
          <TaskFilter key={i} filter={filter} />
        ))}
      </ul>
      <ClearCompletedButton />
    </div>
  );
};

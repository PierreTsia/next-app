"use client";

import React, { useState } from "react";
import { ITask, TaskContext } from "@/src/tasks/TaskContext";
import { mockTasks } from "@/mocks/tasks";
import { Filter } from "@/src/tasks/TaskContext";

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<ITask[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const addTask = (task: ITask) => {
    setTasks((curr) => [task, ...curr]);
  };

  const removeTask = (id: number) => {
    setTasks((curr) => curr.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((curr) => curr.filter((task) => !task.completed));
  };

  const toggleTask = (id: number) => {
    setTasks((curr) =>
      curr.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        allTasks: tasks,
        addTask,
        removeTask,
        toggleTask,
        activeFilter,
        setActiveFilter,
        clearCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

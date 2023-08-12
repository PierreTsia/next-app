"use client";
import { ReactNode } from "react";
import { TaskItem } from "@/src/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";

export const TaskList = ({ children }: { children: ReactNode }) => {
  const { displayedTasks } = useTasks();

  return (
    <>
      <ul className="min-h-[300px] mt-4  flex flex-col rounded bg-bgContent shadow-2xl">
        {displayedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      {children}
    </>
  );
};

import { ITask } from "@/src/tasks/TaskContext";
import { useState } from "react";
import Image from "next/image";
import { useTasks } from "@/hooks/useTasks";
import { TaskCheckbox } from "@/src/components/TaskCheckbox";

export const TaskItem = ({ task }: { task: ITask }) => {
  const [isHover, setIsHover] = useState(false);
  const { toggleTask, removeTask } = useTasks();
  return (
    <li
      key={task.id}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={
        "w-full h-full p-4  border-b border-b-slate-200 dark:border-b-gray-600 flex items-center justify-start cursor-pointer"
      }
    >
      <TaskCheckbox
        isCompleted={task.completed}
        toggle={() => toggleTask(task.id)}
      />

      <p className={`${task.completed ? "opacity-50 line-through" : ""}`}>
        {task.title}
      </p>
      {isHover && (
        <Image
          className={"ml-auto mr-3 cursor-pointer"}
          src={"/icon-cross.svg"}
          alt={"delete task icon"}
          onClick={() => removeTask(task.id)}
          width={15}
          height={15}
        />
      )}
    </li>
  );
};

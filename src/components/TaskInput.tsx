"use client";
import { useState } from "react";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useTasks } from "@/hooks/useTasks";

const _BaseInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (s: string) => void;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={"w-full h-full p-6 bg-bgContent rounded"}
    />
  );
};

export const TaskInput = () => {
  const [value, setValue] = useState("an important thing to do");
  const { addTask } = useTasks();

  const handleAddTask = () => {
    addTask({
      id: Math.random(),
      title: value,
      completed: false,
    });
    setValue("");
  };
  useKeyPress("Enter", () => handleAddTask());
  return <_BaseInput value={value} setValue={setValue} />;
};

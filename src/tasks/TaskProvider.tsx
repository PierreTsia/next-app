"use client";

import React, { useEffect, useState } from "react";
import { ITask, TaskContext } from "@/src/tasks/TaskContext";
import { Filter } from "@/src/tasks/TaskContext";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import sortBy from "lodash/sortBy";
import { POSITION_INCREMENT } from "@/hooks/useTasks";

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setProfileId(data?.user?.id ?? "");
    };
    getUser();

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("position", { ascending: true });

      if (error) console.log(error);
      if (data) {
        setTasks(data);
      }
    };
    fetchTasks();
  }, [supabase]);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [profileId, setProfileId] = useState<string>("");

  const updateTask = async (task: ITask) => {
    // Optimistic update to avoid UI Glitches
    setTasks((curr) =>
      sortBy(
        curr.map((t) => (t.id === task.id ? task : t)),
        "position",
      ),
    );
    const { data: updatedTask, error } = await supabase
      .from("tasks")
      .update(task)
      .match({ id: task.id })
      .select("*");
    if (error) console.log(error);
  };

  const addTask = async (task: Pick<ITask, "completed" | "title">) => {
    if (!profileId) return console.log("No profile id");
    const previousTaskPosition = sortBy(tasks, "position")[0]?.position;
    const taskPosition = Math.round(
      previousTaskPosition ? previousTaskPosition / 2 : POSITION_INCREMENT,
    );

    const { data: newTask, error } = await supabase
      .from("tasks")
      .insert({
        ...task,
        profile_id: profileId,
        position: taskPosition,
      })
      .select("*");
    if (error) console.log(error);
    if (newTask) {
      setTasks((curr) => [newTask[0], ...curr]);
    }
  };

  const removeTask = async (id: number) => {
    const { data: removedTask, error } = await supabase
      .from("tasks")
      .delete()
      .match({ id: id });
    if (error) {
      console.log(error);
    } else {
      setTasks((curr) => curr.filter((task) => task.id !== id));
    }
  };

  const clearCompleted = async () => {
    const completedTasksId = tasks
      .filter((task) => task.completed)
      .map((task) => task.id);

    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .in("id", completedTasksId);

    if (error) {
      console.log(error);
    } else {
      setTasks((curr) => curr.filter((task) => !task.completed));
    }
  };

  const toggleTask = async (id: number) => {
    const { data: updatedTask, error } = await supabase
      .from("tasks")
      .update({ completed: true })
      .match({ id: id });
    if (error) console.log(error);
    if (updatedTask) {
      setTasks((curr) =>
        curr.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      );
    }

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
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

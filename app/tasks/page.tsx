import { TaskLayout } from "@/src/components/TaskLayout";
import { TaskInput } from "@/src/components/TaskInput";
import TaskProvider from "@/src/tasks/TaskProvider";
import { TaskList } from "@/src/components/TaskList";
import { TaskActions } from "@/src/components/TaskActions";

export default function TaskPage() {
  return (
    <main className="min-h-screen bg-bgColor text-textColor flex flex-col items-center justify-start">
      <TaskProvider>
        <TaskLayout>
          <TaskInput />
          <TaskList>
            <TaskActions />
          </TaskList>
        </TaskLayout>
      </TaskProvider>
    </main>
  );
}

"use client";
import { ReactNode, useContext } from "react";
import { TaskItem } from "@/src/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ThemeContext } from "@/src/theme/ThemeContext";

const DraggableItem = ({
  children,
  draggableId,
  index,
}: {
  children: ReactNode;

  draggableId: string;
  index: number;
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          className={`w-full ${
            snapshot.isDragging ? "opacity-50 border border-borderColor" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export const TaskList = ({ children }: { children: ReactNode }) => {
  const {
    displayedTasks,
    newTaskPosition,
    taskByIndex,
    updateTask,
    activeFilter,
  } = useTasks();
  const { darkTheme } = useContext(ThemeContext);

  const grid = 8;

  const getListStyle = (isDraggingOver: boolean) => ({
    padding: grid,
    width: 900,
    minHeight: 300,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const directionOffset =
      result.destination.index > result.source.index ? 1 : -1;
    const newPosition = newTaskPosition(
      result.destination.index,
      activeFilter,
      directionOffset,
    );
    const task = taskByIndex(result.source.index, activeFilter);
    if (!task) return;
    updateTask({ ...task, position: newPosition });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ul className="min-h-[300px] mt-4  flex flex-col rounded bg-bgContent shadow-2xl w-[900px]">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {displayedTasks.map((task, index) => (
                  <DraggableItem
                    draggableId={`${task.id}`}
                    key={task.id}
                    index={index}
                  >
                    <TaskItem task={task} />
                  </DraggableItem>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
      {children}
    </>
  );
};

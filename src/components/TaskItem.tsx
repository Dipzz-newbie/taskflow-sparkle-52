import React from "react";
import { Check, Trash2 } from "lucide-react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li
      className={cn(
        "group flex items-center justify-between",
        "bg-task-bg hover:bg-task-hover",
        "border border-task-border rounded-xl p-4",
        "shadow-sm hover:shadow-md",
        "transition-all duration-300 ease-in-out",
        "transform hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2",
            "flex items-center justify-center",
            "transition-all duration-300",
            task.completed
              ? "bg-primary border-primary scale-110"
              : "border-muted-foreground hover:border-primary hover:scale-110"
          )}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check size={16} className="text-primary-foreground" />}
        </button>

        <span
          className={cn(
            "text-sm sm:text-base font-medium transition-all duration-300",
            "break-words",
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          )}
        >
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className={cn(
          "flex-shrink-0 ml-3 p-2 rounded-lg",
          "text-destructive hover:bg-destructive/10",
          "transition-all duration-200",
          "opacity-0 group-hover:opacity-100",
          "focus:opacity-100"
        )}
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TaskItem;

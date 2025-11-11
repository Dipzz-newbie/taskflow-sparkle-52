import React, { useState } from "react";
import { Check, Edit2, Save, Trash2, X } from "lucide-react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

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
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
          disabled={isEditing}
        >
          {task.completed && (
            <Check size={16} className="text-primary-foreground" />
          )}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className={cn(
              "flex-1 px-3 py-2 rounded-lg",
              "border border-primary bg-background",
              "text-sm font-medium text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
            autoFocus
          />
        ) : (
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
        )}
      </div>

      <div className="flex items-center gap-2 ml-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className={cn(
                "flex-shrink-0 p-2 rounded-lg",
                "text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30",
                "transition-all duration-200"
              )}
              aria-label="Save changes"
            >
              <Save size={18} />
            </button>
            <button
              onClick={handleCancel}
              className={cn(
                "flex-shrink-0 p-2 rounded-lg",
                "text-muted-foreground hover:bg-muted",
                "transition-all duration-200"
              )}
              aria-label="Cancel editing"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={cn(
                "flex-shrink-0 p-2 rounded-lg",
                "text-primary hover:bg-primary/10",
                "transition-all duration-200",
                "opacity-0 group-hover:opacity-100",
                "focus:opacity-100"
              )}
              aria-label="Edit task"
              disabled={task.completed}
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className={cn(
                "flex-shrink-0 p-2 rounded-lg",
                "text-destructive hover:bg-destructive/10",
                "transition-all duration-200",
                "opacity-0 group-hover:opacity-100",
                "focus:opacity-100"
              )}
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;

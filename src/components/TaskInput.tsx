import React, { useState, useRef, KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className={cn(
          "flex-1 px-4 py-3 rounded-xl",
          "border border-input bg-background",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "transition-all duration-200",
          "text-sm sm:text-base"
        )}
        aria-label="New task input"
      />
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        className={cn(
          "flex-shrink-0 p-3 rounded-xl",
          "bg-primary text-primary-foreground",
          "hover:opacity-90 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200",
          "shadow-md hover:shadow-lg"
        )}
        aria-label="Add task"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TaskInput;

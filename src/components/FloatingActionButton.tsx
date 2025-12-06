import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-6 z-40",
        "w-14 h-14 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      aria-label="Create new task"
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  );
};

export default FloatingActionButton;

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task, Theme } from "@/types";

interface AppContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  theme: Theme;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const theme: Theme = {
    textSecondary: "#6c757d",
  };

  return (
    <AppContext.Provider value={{ tasks, setTasks, theme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

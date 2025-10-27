import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppContextType, Task, ThemeColors } from "@/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const theme: ThemeColors = {
    bg: darkMode ? "hsl(var(--background))" : "hsl(var(--background))",
    surface: darkMode ? "hsl(var(--card))" : "hsl(var(--card))",
    surfaceHover: darkMode ? "hsl(var(--task-hover))" : "hsl(var(--task-hover))",
    border: darkMode ? "hsl(var(--border))" : "hsl(var(--border))",
    text: darkMode ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
    textSecondary: darkMode ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))",
    accent: darkMode ? "hsl(var(--primary))" : "hsl(var(--primary))",
  };

  return (
    <AppContext.Provider value={{ tasks, setTasks, darkMode, setDarkMode, theme }}>
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

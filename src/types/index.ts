export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category?: string;
}

export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textSecondary: string;
  accent: string;
}

export interface AppContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ThemeColors;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Theme {
  textSecondary?: string;
}

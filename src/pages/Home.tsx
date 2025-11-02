import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types";
import { CheckCircle2 } from "lucide-react";

const Home: React.FC = () => {
  const { tasks, setTasks, user } = useApp();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!user) {
      window.location.hash = '/login';
    }
  }, [user]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl mb-4 shadow-lg">
            <CheckCircle2 size={32} className="text-primary-foreground sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Task Manager
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Stay organized and productive
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 sm:p-8">
          {/* Input Section */}
          <div className="mb-6">
            <TaskInput onAdd={addTask} />
          </div>

          {/* Stats */}
          {totalCount > 0 && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
              <div className="flex gap-2">
                <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{
                      width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                  <CheckCircle2 size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  No tasks yet. Create your first task above!
                </p>
              </div>
            ) : (
              <ul className="space-y-2 sm:space-y-3">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-xs sm:text-sm text-muted-foreground">
          <p>Click on tasks to mark them as complete</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;

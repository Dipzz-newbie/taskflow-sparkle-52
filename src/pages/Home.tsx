import React, { useEffect, useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import TaskInput from "@/components/TaskInput";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types";
import { CheckCircle2, Search, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "createdAt-desc" | "createdAt-asc" | "updatedAt-desc" | "updatedAt-asc";

const Home: React.FC = () => {
  const { tasks, setTasks, user } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("createdAt-desc");

  useEffect(() => {
    if (!user) {
      window.location.hash = "/login";
    }
  }, [user]);

  const addTask = (title: string, desc?: string) => {
    const now = Date.now();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      desc,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task Added Successfully!");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task Deleted!");
  };

  const editTask = (id: string, title: string, desc?: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title, desc, updatedAt: Date.now() } : t
      )
    );
    toast.success("Task Updated!");
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((task) => {
        const titleMatch = task.title.toLowerCase().includes(query);
        const createdAtMatch = new Date(task.createdAt)
          .toLocaleString("id-ID")
          .toLowerCase()
          .includes(query);
        const updatedAtMatch = new Date(task.updatedAt)
          .toLocaleString("id-ID")
          .toLowerCase()
          .includes(query);
        return titleMatch || createdAtMatch || updatedAtMatch;
      });
    }

    // Sort
    const [field, order] = sortOption.split("-") as ["createdAt" | "updatedAt", "asc" | "desc"];
    result.sort((a, b) => {
      const diff = a[field] - b[field];
      return order === "asc" ? diff : -diff;
    });

    return result;
  }, [tasks, searchQuery, sortOption]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl mb-4 shadow-lg">
            <CheckCircle2
              size={32}
              className="text-primary-foreground sm:w-10 sm:h-10"
            />
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

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, date..."
                className="pl-10 h-11 rounded-xl"
              />
            </div>
            <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
              <SelectTrigger className="w-full sm:w-[200px] h-11 rounded-xl">
                <ArrowUpDown size={16} className="mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-desc">Created (Newest)</SelectItem>
                <SelectItem value="createdAt-asc">Created (Oldest)</SelectItem>
                <SelectItem value="updatedAt-desc">Updated (Newest)</SelectItem>
                <SelectItem value="updatedAt-asc">Updated (Oldest)</SelectItem>
              </SelectContent>
            </Select>
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
                      width: `${
                        totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {filteredAndSortedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                  <CheckCircle2 size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {tasks.length === 0
                    ? "No tasks yet. Create your first task above!"
                    : "No tasks found matching your search."}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredAndSortedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-xs sm:text-sm text-muted-foreground">
          <p>Click on tasks to mark as complete • Hover to edit or delete</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;

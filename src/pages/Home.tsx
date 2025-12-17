import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import TaskCard from "@/components/TaskCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import { CheckCircle2, Search, ArrowUpDown, CalendarIcon, X, Clock, ListTodo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

type SortOption = "createdAt-desc" | "createdAt-asc" | "updatedAt-desc" | "updatedAt-asc";

const Home: React.FC = () => {
  const { tasks, setTasks, user } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("createdAt-desc");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!user) {
      window.location.hash = "/login";
    }
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWIBTime = useCallback((date: Date) => {
    const wibOffset = 7 * 60;
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const wibDate = new Date(utc + wibOffset * 60000);
    return wibDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }, []);

  const formatFullDate = useCallback((date: Date) => {
    const wibOffset = 7 * 60;
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const wibDate = new Date(utc + wibOffset * 60000);
    return wibDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
      )
    );
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((task) => task.title.toLowerCase().includes(query));
    }

    if (selectedDate) {
      result = result.filter((task) => {
        const createdDate = new Date(task.createdAt);
        const updatedDate = new Date(task.updatedAt);

        const matchesCreatedDate =
          createdDate.getFullYear() === selectedDate.getFullYear() &&
          createdDate.getMonth() === selectedDate.getMonth() &&
          createdDate.getDate() === selectedDate.getDate();

        const matchesUpdatedDate =
          updatedDate.getFullYear() === selectedDate.getFullYear() &&
          updatedDate.getMonth() === selectedDate.getMonth() &&
          updatedDate.getDate() === selectedDate.getDate();

        if (selectedTime) {
          const [hours, minutes] = selectedTime.split(":").map(Number);
          
          const matchesCreatedTime =
            matchesCreatedDate &&
            createdDate.getHours() === hours &&
            createdDate.getMinutes() === minutes;

          const matchesUpdatedTime =
            matchesUpdatedDate &&
            updatedDate.getHours() === hours &&
            updatedDate.getMinutes() === minutes;

          return matchesCreatedTime || matchesUpdatedTime;
        }

        return matchesCreatedDate || matchesUpdatedDate;
      });
    }

    const [field, order] = sortOption.split("-") as ["createdAt" | "updatedAt", "asc" | "desc"];
    result.sort((a, b) => {
      const diff = a[field] - b[field];
      return order === "asc" ? diff : -diff;
    });

    return result;
  }, [tasks, searchQuery, sortOption, selectedDate, selectedTime]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  const handleCreateTask = () => {
    window.location.hash = "/tasks/new";
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/50 px-3 py-3 sm:px-4 sm:py-4">
        <div className="max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="animate-greeting-in mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl shadow-md shrink-0">
                <ListTodo size={18} className="text-primary-foreground sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-foreground font-medium truncate">
                  Hi there! 👋
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Clock size={12} className="shrink-0" />
                  <span className="font-medium">{formatWIBTime(currentTime)} WIB</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-xs">{formatFullDate(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Row */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 h-9 sm:h-10 rounded-lg text-sm"
                />
              </div>
              <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
                <SelectTrigger className="w-[120px] sm:w-[150px] h-9 sm:h-10 rounded-lg text-xs sm:text-sm">
                  <ArrowUpDown size={14} className="mr-1 shrink-0" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest</SelectItem>
                  <SelectItem value="updatedAt-desc">Updated</SelectItem>
                  <SelectItem value="updatedAt-asc">Updated (Old)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 sm:w-auto h-9 sm:h-10 rounded-lg justify-start text-left text-xs sm:text-sm",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                    {selectedDate ? format(selectedDate, "dd MMM yyyy", { locale: id }) : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-2 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-[100px] sm:w-[120px] h-9 sm:h-10 rounded-lg text-xs sm:text-sm"
                disabled={!selectedDate}
              />

              {selectedDate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearDateFilter}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg shrink-0"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-3 py-4 sm:px-4 sm:py-6 pb-24">
          {/* Stats */}
          {totalCount > 0 && (
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <span className="text-xs sm:text-sm text-muted-foreground">
                {completedCount}/{totalCount} done
              </span>
              <div className="h-1.5 w-20 sm:w-24 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{
                    width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Active Date Filter */}
          {selectedDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1.5 rounded-lg mb-4">
              <CalendarIcon size={12} />
              <span>
                {format(selectedDate, "dd MMMM yyyy", { locale: id })}
                {selectedTime && ` at ${selectedTime}`}
              </span>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-2 sm:space-y-3">
            {filteredAndSortedTasks.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-secondary rounded-full mb-3">
                  <CheckCircle2 size={24} className="text-muted-foreground sm:w-7 sm:h-7" />
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {tasks.length === 0
                    ? "No tasks yet. Tap + to create one!"
                    : "No matching tasks found."}
                </p>
              </div>
            ) : (
              <ul className="space-y-2 sm:space-y-3">
                {filteredAndSortedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggleComplete}
                    index={index}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-6 text-xs text-muted-foreground">
            <p>Tap tasks to view details</p>
          </footer>
        </div>
      </div>

      <FloatingActionButton onClick={handleCreateTask} />
    </div>
  );
};

export default Home;

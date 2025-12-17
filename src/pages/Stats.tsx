import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import { BarChart3, CheckCircle2, Circle, TrendingUp } from "lucide-react";

const Stats: React.FC = () => {
  const { tasks, user } = useApp();

  useEffect(() => {
    if (!user) {
      window.location.hash = '/login';
    }
  }, [user]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;
  const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const stats = [
    { label: "Total", value: tasks.length, icon: BarChart3, color: "text-primary" },
    { label: "Done", value: completedCount, icon: CheckCircle2, color: "text-green-500" },
    { label: "Active", value: activeCount, icon: Circle, color: "text-blue-500" },
    { label: "Rate", value: `${completionRate.toFixed(0)}%`, icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <PageLayout
      icon={BarChart3}
      title="Statistics"
      subtitle="Your productivity overview"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl shadow-md border border-border p-3 sm:p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Icon size={18} className={`${stat.color} sm:w-5 sm:h-5`} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Card */}
      {tasks.length > 0 && (
        <div className="mt-4 bg-card rounded-xl shadow-md border border-border p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Progress</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>Done: {completedCount}</span>
              <span>Left: {activeCount}</span>
            </div>
            <div className="h-2.5 sm:h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              {completionRate.toFixed(1)}% completed
            </p>
          </div>
        </div>
      )}

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <div className="mt-4 bg-card rounded-xl shadow-md border border-border p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Recent</h2>
          <div className="space-y-2">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-2 p-2 sm:p-2.5 bg-task-bg rounded-lg border border-task-border">
                {task.completed ? (
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <Circle size={16} className="text-muted-foreground shrink-0 sm:w-[18px] sm:h-[18px]" />
                )}
                <span className={`text-xs sm:text-sm truncate ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Stats;

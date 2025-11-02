import React, { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Settings as SettingsIcon, Moon, Sun, Trash2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings: React.FC = () => {
  const { darkMode, setDarkMode, setTasks, user, signOut } = useApp();

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!user) {
      window.location.hash = '/auth';
    }
  }, [user]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
      setTasks([]);
      toast.success("All tasks have been cleared");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl mb-4 shadow-lg">
            <SettingsIcon size={32} className="text-primary-foreground sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Customize your experience
          </p>
        </header>

        {/* Settings Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 sm:p-8 space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-task-bg rounded-lg border border-task-border">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={24} className="text-primary" /> : <Sun size={24} className="text-primary" />}
              <div>
                <h3 className="font-semibold text-foreground">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  {darkMode ? "Switch to light theme" : "Switch to dark theme"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="min-w-[80px]"
            >
              {darkMode ? "Light" : "Dark"}
            </Button>
          </div>

          {/* Clear All Tasks */}
          <div className="flex items-center justify-between p-4 bg-task-bg rounded-lg border border-task-border">
            <div className="flex items-center gap-3">
              <Trash2 size={24} className="text-destructive" />
              <div>
                <h3 className="font-semibold text-foreground">Clear All Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Delete all tasks permanently
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearAll}
              className="min-w-[80px]"
            >
              Clear
            </Button>
          </div>

          {/* Account Section */}
          <div className="mt-6 p-4 bg-task-bg rounded-lg border border-task-border">
            <h3 className="font-semibold text-foreground mb-3">Account</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="text-sm font-medium text-foreground">{user?.email}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={signOut}
                className="w-full"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* App Info */}
          <div className="mt-4 p-4 bg-task-bg rounded-lg border border-task-border">
            <h3 className="font-semibold text-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              Task Manager App v1.0
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              A simple and elegant task management application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

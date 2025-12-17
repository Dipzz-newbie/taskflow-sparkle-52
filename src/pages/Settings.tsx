import React, { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Trash2,
  LogOut,
  Camera,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings: React.FC = () => {
  const {
    darkMode,
    setDarkMode,
    setTasks,
    user,
    signOut,
    profilePicture,
    setProfilePicture,
    displayName,
    setDisplayName,
  } = useApp();

  const [tempDisplayName, setTempDisplayName] = useState(displayName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      window.location.hash = "/login";
    }
  }, [user]);

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all tasks? This action cannot be undone."
      )
    ) {
      setTasks([]);
      toast.success("All tasks have been cleared");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture("");
    toast.success("Profile picture removed");
  };

  const handlerSaveDisplayName = () => {
    if (tempDisplayName.trim()) {
      setDisplayName(tempDisplayName.trim());
      toast.success("Display name updated!");
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <PageLayout
      icon={SettingsIcon}
      title="Settings"
      subtitle="Customize your experience"
    >
      <div className="space-y-4">
        {/* Profile Section */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border">
          <h3 className="font-semibold text-sm sm:text-base text-foreground mb-3 flex items-center gap-2">
            <User size={16} className="sm:w-[18px] sm:h-[18px]" />
            Profile
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-primary shadow-md">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center text-lg sm:text-xl font-bold text-primary-foreground">
                    {user?.email ? getInitials(user.email) : "U"}
                  </div>
                )}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={20} className="text-white" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full space-y-3">
              <div>
                <Label
                  htmlFor="displayName"
                  className="text-xs sm:text-sm font-medium mb-1.5 block"
                >
                  Display Name
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="displayName"
                    value={tempDisplayName}
                    onChange={(e) => setTempDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 h-9 sm:h-10 text-sm"
                  />
                  <Button
                    onClick={handlerSaveDisplayName}
                    size="sm"
                    className="h-9 sm:h-10 px-3 text-xs sm:text-sm"
                    disabled={
                      !tempDisplayName.trim() ||
                      tempDisplayName === displayName
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {user?.email}
                </p>
              </div>

              {profilePicture && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveProfilePicture}
                  className="w-full sm:w-auto h-8 text-xs"
                >
                  Remove Picture
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-task-bg rounded-xl border border-task-border">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {darkMode ? (
              <Moon size={20} className="text-primary sm:w-[22px] sm:h-[22px]" />
            ) : (
              <Sun size={20} className="text-primary sm:w-[22px] sm:h-[22px]" />
            )}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Dark Mode</h3>
              <p className="text-xs text-muted-foreground">
                {darkMode ? "Light theme" : "Dark theme"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            className="min-w-[60px] h-8 sm:h-9 text-xs sm:text-sm"
          >
            {darkMode ? "Light" : "Dark"}
          </Button>
        </div>

        {/* Clear All Tasks */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-task-bg rounded-xl border border-task-border">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Trash2 size={20} className="text-destructive sm:w-[22px] sm:h-[22px]" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Clear Tasks</h3>
              <p className="text-xs text-muted-foreground">
                Delete all permanently
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAll}
            className="min-w-[60px] h-8 sm:h-9 text-xs sm:text-sm"
          >
            Clear
          </Button>
        </div>

        {/* Sign Out */}
        <div className="p-3 sm:p-4 bg-destructive/10 rounded-xl border border-destructive/20">
          <Button
            variant="destructive"
            size="sm"
            onClick={signOut}
            className="w-full h-9 sm:h-10 text-sm"
          >
            <LogOut size={14} className="mr-2 sm:w-4 sm:h-4" />
            Sign Out
          </Button>
        </div>

        {/* App Info */}
        <div className="p-3 sm:p-4 bg-task-bg rounded-xl border border-task-border">
          <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1.5">About</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Task Manager v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            A simple task management app
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;

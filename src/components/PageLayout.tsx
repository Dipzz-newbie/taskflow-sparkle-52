import React from "react";
import { LucideIcon } from "lucide-react";

interface PageLayoutProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  icon: Icon,
  title,
  subtitle,
  children,
  headerContent,
}) => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/50 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4">
            {Icon && (
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl shadow-md shrink-0">
                <Icon size={20} className="text-primary-foreground sm:w-6 sm:h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerContent && (
            <div className="mt-3">
              {headerContent}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-6 pb-24">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

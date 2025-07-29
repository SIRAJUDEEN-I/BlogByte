"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Menu,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="md:hidden m-4 border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-[280px] border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm"
        >
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen w-[280px] border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default LeftSidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Overview",
      isActive: pathname === "/dashboard",
    },
    {
      href: "/dashboard/articles",
      icon: FileText,
      label: "Articles",
      isActive: pathname.startsWith("/dashboard/articles") && !pathname.includes("/create"),
    },
    {
      href: "/dashboard/articles/create",
      icon: PlusCircle,
      label: "Create Article",
      isActive: pathname === "/dashboard/articles/create",
    },
    {
      href: "/dashboard/comments",
      icon: MessageCircle,
      label: "Comments",
      isActive: pathname.startsWith("/dashboard/comments"),
    },
    {
      href: "/dashboard/analytics", 
      icon: BarChart,
      label: "Analytics",
      isActive: pathname.startsWith("/dashboard/analytics"),
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Settings", 
      isActive: pathname.startsWith("/dashboard/settings"),
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Byte
            </span>
          </div>
        </Link>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 ml-11">
          Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start h-11 px-3 transition-all duration-200 ${
                  item.isActive
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 shadow-sm"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                onClick={closeSheet}
              >
                <div className={`mr-3 p-1.5 rounded-md transition-colors duration-200 ${
                  item.isActive
                    ? "bg-blue-100 dark:bg-blue-900/40"
                    : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="px-4 py-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="space-y-3">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-3">
            Quick Actions
          </p>
          <Link href="/dashboard/articles/create">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
              onClick={closeSheet}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
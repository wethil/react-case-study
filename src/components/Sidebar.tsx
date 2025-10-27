import React from "react";
import type { Route } from "@/routes";

export interface SidebarProps {
  currentPage: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  routes: Record<string, Route>;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
  routes,
}) => (
  <aside
    className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:relative md:translate-x-0`}
    role="complementary"
    aria-label="Navigation sidebar"
  >
    <div className="p-6">
      <button
        onClick={onToggle}
        className="md:hidden mb-4 p-2 rounded focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors w-32 flex items-center justify-center"
        aria-label={isOpen ? "Close sidebar" : "Toggle sidebar"}
        style={{ minHeight: 44, minWidth: 44 }}
      >
        <span className="text-xl font-bold">ProductsUp</span>
      </button>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
          {routes.home?.icon ?? "🏪"}
        </div>
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <nav className="space-y-2">
        {Object.entries(routes).map(([routeKey, route]) => (
          <button
            key={routeKey}
            onClick={() => onNavigate(route.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === routeKey
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
            aria-current={currentPage === routeKey ? "page" : undefined}
            aria-label={route.ariaLabel}
            style={{ minHeight: 44 }}
          >
            <span className="text-xl">{route.icon}</span>
            <span className="font-medium">{route.title}</span>
          </button>
        ))}
      </nav>
    </div>
  </aside>
);

Sidebar.displayName = "Sidebar";

export default Sidebar;

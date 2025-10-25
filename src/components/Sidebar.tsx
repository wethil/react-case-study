import React from "react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  const navItems = [
    { id: "products", label: "Products", icon: "📦" },
    { id: "about", label: "About Case Study", icon: "ℹ️" },
  ];

  return (
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
          className="md:hidden mb-4 p-2 rounded focus:ring-2 focus:ring-blue-500 transition-colors w-32 flex items-center justify-center"
          aria-label={isOpen ? "Close sidebar" : "Toggle sidebar"}
        >
          <span className="text-xl font-bold">ProductsUp</span>
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
            🏪
          </div>
          <span className="text-xl font-bold">Dashboard</span>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              aria-current={currentPage === item.id ? "page" : undefined}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

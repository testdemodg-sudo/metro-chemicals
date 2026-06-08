import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  BarChart3,
  ChevronRight,
  FlaskConical,
  LogOut,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type AdminTab = "products" | "purchases" | "sales" | "inventory";

interface AdminLayoutProps {
  children: (activeTab: AdminTab, setTab: (tab: AdminTab) => void) => ReactNode;
}

const tabs: { id: AdminTab; label: string; icon: ReactNode }[] = [
  {
    id: "products",
    label: "Product Management",
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: "purchases",
    label: "Purchase Records",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  {
    id: "sales",
    label: "Sales Tracking",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } flex-shrink-0 bg-card border-r border-border flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-border flex items-center px-4 gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-4 h-4 text-primary" />
          </div>
          {sidebarOpen && (
            <span className="font-display font-bold text-sm truncate">
              Metro <span className="text-primary">Chemicals</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
              title={!sidebarOpen ? tab.label : undefined}
            >
              <span className="flex-shrink-0">{tab.icon}</span>
              {sidebarOpen && <span className="truncate">{tab.label}</span>}
              {sidebarOpen && activeTab === tab.id && (
                <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0 text-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Collapse + logout */}
        <div className="p-2 border-t border-border space-y-1">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronRight
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
            />
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <button
            type="button"
            data-ocid="admin-logout"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-smooth"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
          <div>
            <h1 className="font-display font-bold text-base text-foreground">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">
              Metro Chemicals Admin
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children(activeTab, setActiveTab)}
        </div>
      </main>
    </div>
  );
}

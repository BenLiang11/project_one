"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  Film, 
  Library,
  BarChart3, 
  CreditCard, 
  Settings, 
  HelpCircle,
  LogOut,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Videos", href: "/dashboard/videos", icon: Film },
  { name: "Templates", href: "/dashboard/templates", icon: Library },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-near-black/95 backdrop-blur-md">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">
              Clip Pilot
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-light-text/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
          <div className="border-t border-white/10 p-4 space-y-3">
            {/* Upgrade Banner */}
            <div className="rounded-lg bg-white/5 p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-xs font-semibold text-white">Upgrade Available</span>
              </div>
            <p className="text-xs text-light-text/80 mb-3">
              Unlock unlimited videos and premium features
            </p>
            <Link href="/pricing">
              <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20">
                View Plans
              </Button>
            </Link>
          </div>

          {/* Logout */}
          <form action="/api/auth/logout" method="POST" className="w-full">
            <Button 
              type="submit"
              variant="ghost" 
              className="w-full justify-start text-light-text/60 hover:text-white hover:bg-white/5"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}


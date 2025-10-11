"use client";

import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  userEmail: string;
  userName?: string;
}

export function UserMenu({ userEmail, userName }: UserMenuProps) {
  // Get initials from name or email
  const getInitials = () => {
    if (userName) {
      const names = userName.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return userName.substring(0, 2).toUpperCase();
    }
    // Fall back to email initials
    return userEmail.substring(0, 2).toUpperCase();
  };

  // Get display name
  const displayName = userName || userEmail.split("@")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1 rounded-full hover:bg-electric-purple/10 transition-colors focus:outline-none focus:ring-2 focus:ring-electric-purple focus:ring-offset-2 focus:ring-offset-near-black">
          {/* Initials Circle */}
          <div className="w-10 h-10 rounded-full bg-electric-purple flex items-center justify-center text-white font-semibold text-sm">
            {getInitials()}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-card/95 backdrop-blur-md border-electric-purple/30"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-light-text">{displayName}</p>
            <p className="text-xs text-light-text/60">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-electric-purple/20" />
        <DropdownMenuItem asChild>
          <Link 
            href="/dashboard/settings" 
            className="flex items-center cursor-pointer text-light-text hover:bg-electric-purple/10"
          >
            <Settings className="mr-2 h-4 w-4 text-electric-purple" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-electric-purple/20" />
        <DropdownMenuItem asChild>
          <form action="/api/auth/logout" method="POST" className="w-full">
            <button
              type="submit"
              className="flex w-full items-center cursor-pointer text-light-text hover:bg-electric-purple/10 px-2 py-1.5 text-sm"
            >
              <LogOut className="mr-2 h-4 w-4 text-light-purple" />
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


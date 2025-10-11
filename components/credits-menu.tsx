"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Plus, Calendar, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

export function CreditsMenu() {
  const [credits, setCredits] = useState(10);
  const [totalCredits, setTotalCredits] = useState(10);
  const [daysLeft, setDaysLeft] = useState(23);
  const [plan, setPlan] = useState("Starter");

  useEffect(() => {
    // Fetch user's subscription and credits data
    const fetchCredits = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Mock data - replace with actual API call
        setCredits(7);
        setTotalCredits(10);
        setDaysLeft(23);
        setPlan("Starter");
      }
    };

    fetchCredits();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
          <Zap className="h-4 w-4 text-white" />
          <span className="font-semibold text-white">{credits}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 bg-card/95 backdrop-blur-md border-white/20"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-3 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-light-text/60" />
                <span className="text-sm text-light-text/60">Current Plan</span>
              </div>
              <span className="text-sm font-semibold text-light-text">{plan}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text/60">Credits</span>
                <span className="text-sm font-semibold text-light-text">
                  {credits} / {totalCredits}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${((credits / totalCredits) * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-light-text/60" />
                <span className="text-sm text-light-text/60">Resets in</span>
              </div>
              <span className="text-sm font-semibold text-light-text">{daysLeft} days</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem asChild>
          <Link 
            href="/dashboard/subscription" 
            className="flex items-center cursor-pointer text-light-text hover:bg-white/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add More Credits
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            href="/pricing" 
            className="flex items-center cursor-pointer text-light-text hover:bg-white/10"
          >
            <Package className="mr-2 h-4 w-4" />
            View Plans
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


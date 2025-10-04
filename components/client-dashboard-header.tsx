"use client";

import { useEffect, useState } from "react";
import { UserMenu } from "@/components/user-menu";
import { CreditsMenu } from "@/components/credits-menu";
import { createClient } from "@/lib/supabase/client";

export function ClientDashboardHeader() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.user_metadata?.name || "");
      }
    };

    fetchUser();
  }, []);

  if (!userEmail) {
    return (
      <header className="sticky top-0 z-30 w-full bg-[#0a0a0a]">
        <div className="flex h-16 items-center justify-end px-6 gap-4">
          <div className="w-20 h-8 rounded-lg bg-white/10 animate-pulse"></div>
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0a0a]">
      <div className="flex h-16 items-center justify-end px-6 gap-4">
        <CreditsMenu />
        <UserMenu userEmail={userEmail} userName={userName} />
      </div>
    </header>
  );
}


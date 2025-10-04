import { UserMenu } from "@/components/user-menu";
import { CreditsMenu } from "@/components/credits-menu";

interface DashboardHeaderProps {
  userEmail: string;
  userName?: string;
}

export function DashboardHeader({ userEmail, userName }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0a0a]">
      <div className="flex h-16 items-center justify-end px-6 gap-4">
        <CreditsMenu />
        <UserMenu userEmail={userEmail} userName={userName} />
      </div>
    </header>
  );
}


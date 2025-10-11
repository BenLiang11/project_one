"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <nav className="border-b border-gray-600/30 bg-near-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">
            Clip Pilot
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isDashboard ? (
            <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-light-text hover:text-medium-orchid hover:bg-electric-purple/10">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/create">
                    <Button variant="ghost" className="text-light-text hover:text-medium-orchid hover:bg-electric-purple/10">
                      Create
                    </Button>
                  </Link>
                  <form action="/api/auth/logout" method="POST">
                    <Button variant="ghost" className="text-light-text hover:text-medium-orchid hover:bg-electric-purple/10">
                      Logout
                    </Button>
                  </form>
            </>
          ) : (
            <>
                  <Link href="/pricing">
                    <Button variant="ghost" className="text-light-text hover:text-gray-300 hover:bg-gray-400/10">
                      Pricing
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="ghost" className="text-light-text hover:text-gray-300 hover:bg-gray-400/10">
                      Login
                    </Button>
                  </Link>
              <Link href="/signup">
                <Button variant="outline" className="border-gray-400 text-light-text hover:bg-gray-400/10 hover:border-gray-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen grid-background relative">
      <div className="orb-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        <div className="container px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-light-text mb-4">
              Welcome to your Dashboard
            </h1>
            <p className="text-light-text/60 mb-8">
              Email: {user.email}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/20">
                <h2 className="text-xl font-bold text-light-text mb-2">
                  Create Your First Video
                </h2>
                <p className="text-light-text/60 mb-4">
                  Start generating AI-powered videos with just a prompt
                </p>
                <Link href="/create">
                  <Button className="bg-electric-purple hover:bg-electric-purple/90 text-white glow-button">
                    Create Video
                  </Button>
                </Link>
              </div>

              <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-medium-orchid/20">
                <h2 className="text-xl font-bold text-light-text mb-2">
                  Your Projects
                </h2>
                <p className="text-light-text/60 mb-4">
                  View and manage your generated videos
                </p>
                <Link href="/projects">
                  <Button variant="outline" className="border-medium-orchid/50 text-light-text hover:bg-medium-orchid/10">
                    View Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Video, 
  Plus, 
  Sparkles,
  Clock,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's projects count
  const { data: projects, count } = await supabase
    .from('video_projects')
    .select('*', { count: 'exact', head: false })
    .eq('user_id', user.id);

  const projectCount = count || 0;
  const completedCount = projects?.filter(p => p.status === 'completed').length || 0;
  const processingCount = projects?.filter(p => p.status === 'processing').length || 0;

  return (
    <div className="flex min-h-screen grid-background relative">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader userEmail={user.email || ""} />
        
        <main className="flex-1 relative z-10 py-8">
        <div className="container px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-light-text/60">
              Welcome back, {user.email?.split('@')[0]}!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Total Videos
                </CardTitle>
                <Video className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-light-text">{projectCount}</div>
                <p className="text-xs text-light-text/60 mt-1">
                  {completedCount} completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Processing
                </CardTitle>
                <Clock className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-light-text">{processingCount}</div>
                <p className="text-xs text-light-text/60 mt-1">
                  Videos in progress
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Current Plan
                </CardTitle>
                <Zap className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-light-text">Starter</div>
                <p className="text-xs text-light-text/60 mt-1">
                  10 videos/month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Primary Action */}
          <div className="mb-8">
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardContent className="p-8 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-white" />
                      <span className="text-sm font-medium text-white">Ready to Create?</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Generate Your Next Video
                    </h2>
                    <p className="text-light-text/80 text-lg">
                      Transform your ideas into professional videos in minutes with AI
                    </p>
                  </div>
                  <Link href="/create">
                    <Button size="lg" className="bg-electric-purple hover:bg-electric-purple/90 text-white text-lg px-8 py-6">
                      <Plus className="mr-2 h-6 w-6" />
                      Create New Video
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-light-text mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-white" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/videos">
                <Card className="bg-card/80 backdrop-blur-md border-white/10 hover:border-white/30 transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-light-text">View All Videos</h3>
                        <p className="text-sm text-light-text/60">{projectCount} total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/templates">
                <Card className="bg-card/80 backdrop-blur-md border-white/10 hover:border-white/30 transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-light-text">Browse Templates</h3>
                        <p className="text-sm text-light-text/60">Start faster</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/analytics">
                <Card className="bg-card/80 backdrop-blur-md border-white/10 hover:border-white/30 transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-light-text">View Analytics</h3>
                        <p className="text-sm text-light-text/60">Track performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Recent Activity / Tips Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-light-text flex items-center gap-2">
                  <Clock className="h-5 w-5 text-white" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projectCount > 0 ? (
                  <div className="space-y-3">
                    {projects?.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="text-sm font-medium text-light-text">{project.title}</p>
                          <p className="text-xs text-light-text/60">{project.format}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'completed' 
                            ? 'bg-white/10 text-white' 
                            : 'bg-white/10 text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-light-text/60 text-center py-4">
                    No videos yet. Create your first video to get started!
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-light-text flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-white" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-light-text/90">
                      💡 Use specific prompts for better results. Include details about style, mood, and target audience.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-light-text/90">
                      ⚡ Videos typically take 2-5 minutes to generate. Check your email for notifications!
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-light-text/90">
                      🎨 Try different video formats to find what works best for your content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}


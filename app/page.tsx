import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Video, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen grid-background relative">
      {/* Animated background orbs */}
      <div className="orb-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="container px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-electric-purple/30 bg-electric-purple/10 px-4 py-1.5 text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-turquoise" />
              <span className="text-light-text">AI-Powered Video Generation</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-light-text">
              Create Amazing Videos with{" "}
              <span className="gradient-text">
                AI in Seconds
              </span>
            </h1>
            
            <p className="max-w-[700px] text-lg text-light-text/70 sm:text-xl">
              Transform your ideas into professional videos instantly. Just enter a prompt, 
              and let our AI handle the script, visuals, voiceover, and editing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/create">
                <Button 
                  size="lg" 
                  className="text-lg px-8 bg-electric-purple hover:bg-electric-purple/90 text-white glow-button"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Try Clip Pilot
                </Button>
              </Link>
              <Link href="/examples">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-electric-purple/50 text-light-text hover:bg-electric-purple/10"
                >
                  <Video className="mr-2 h-5 w-5" />
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Placeholder for Graphics */}
        <section className="container px-4 py-16">
          <div className="rounded-lg border-2 border-dashed border-electric-purple/30 bg-card/50 backdrop-blur-sm p-16 text-center">
            <p className="text-light-text/50">
              Graphics and demo videos will be displayed here
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="container px-4 py-16 pb-24">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/20 hover:border-electric-purple/50 transition-all">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-purple/20 border border-electric-purple/30">
                <Sparkles className="h-7 w-7 text-electric-purple" />
              </div>
              <h3 className="text-xl font-bold text-light-text">AI Script Writing</h3>
              <p className="text-light-text/60">
                GPT-4 powered scripts tailored to your video format
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-medium-orchid/20 hover:border-medium-orchid/50 transition-all">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-medium-orchid/20 border border-medium-orchid/30">
                <Video className="h-7 w-7 text-medium-orchid" />
              </div>
              <h3 className="text-xl font-bold text-light-text">Auto Video Creation</h3>
              <p className="text-light-text/60">
                AI-generated visuals and professional voiceovers
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-turquoise/20 hover:border-turquoise/50 transition-all">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-turquoise/20 border border-turquoise/30">
                <Zap className="h-7 w-7 text-turquoise" />
              </div>
              <h3 className="text-xl font-bold text-light-text">Lightning Fast</h3>
              <p className="text-light-text/60">
                From idea to finished video in minutes, not hours
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-electric-purple/20 py-8 relative z-10 bg-near-black/80 backdrop-blur-sm">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-light-text/50">
              © 2025 Clip Pilot. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-light-text/50 hover:text-turquoise transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-light-text/50 hover:text-turquoise transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-light-text/50 hover:text-turquoise transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

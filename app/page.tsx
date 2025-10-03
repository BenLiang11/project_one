import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Video, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Video Generation
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Create Amazing Videos with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI in Seconds
              </span>
            </h1>
            
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Transform your ideas into professional videos instantly. Just enter a prompt, 
              and let our AI handle the script, visuals, voiceover, and editing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/create">
                <Button size="lg" className="text-lg px-8">
                  <Zap className="mr-2 h-5 w-5" />
                  Try Clip Pilot
                </Button>
              </Link>
              <Link href="/examples">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Video className="mr-2 h-5 w-5" />
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Placeholder for Graphics */}
        <section className="container px-4 py-16">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-16 text-center">
            <p className="text-muted-foreground">
              Graphics and demo videos will be displayed here
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="container px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Script Writing</h3>
              <p className="text-muted-foreground">
                GPT-4 powered scripts tailored to your video format
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Auto Video Creation</h3>
              <p className="text-muted-foreground">
                AI-generated visuals and professional voiceovers
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                From idea to finished video in minutes, not hours
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Clip Pilot. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

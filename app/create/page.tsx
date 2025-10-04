"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { ClientDashboardHeader } from "@/components/client-dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  Wand2, 
  Palette, 
  Music, 
  Mic, 
  Maximize, 
  Video,
  Loader2,
  AlertCircle
} from "lucide-react";

const illustrationThemes = [
  { id: "realistic", name: "Realistic", description: "Photo-realistic style" },
  { id: "cartoon", name: "Cartoon", description: "Fun and animated" },
  { id: "minimalist", name: "Minimalist", description: "Clean and simple" },
  { id: "cinematic", name: "Cinematic", description: "Movie-like quality" },
];

const musicOptions = [
  { id: "upbeat", name: "Upbeat", description: "Energetic and positive" },
  { id: "calm", name: "Calm", description: "Peaceful and relaxing" },
  { id: "corporate", name: "Corporate", description: "Professional tone" },
  { id: "dramatic", name: "Dramatic", description: "Intense and powerful" },
  { id: "none", name: "No Music", description: "Silent background" },
];

const voiceOptions = [
  { id: "male-professional", name: "Male Professional", accent: "US English" },
  { id: "female-friendly", name: "Female Friendly", accent: "US English" },
  { id: "male-narrative", name: "Male Narrative", accent: "UK English" },
  { id: "female-energetic", name: "Female Energetic", accent: "US English" },
];

const aspectRatios = [
  { id: "16:9", name: "16:9", description: "YouTube, Landscape", icon: "📺" },
  { id: "9:16", name: "9:16", description: "TikTok, Reels, Stories", icon: "📱" },
  { id: "1:1", name: "1:1", description: "Instagram Square", icon: "⬜" },
  { id: "4:5", name: "4:5", description: "Instagram Portrait", icon: "📄" },
];

export default function CreatePage() {
  const router = useRouter();
  const [script, setScript] = useState("");
  const [scriptPrompt, setScriptPrompt] = useState("");
  const [generatingScript, setGeneratingScript] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("realistic");
  const [selectedMusic, setSelectedMusic] = useState("upbeat");
  const [selectedVoice, setSelectedVoice] = useState("male-professional");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [videoTitle, setVideoTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateScript = async () => {
    if (!scriptPrompt.trim()) {
      setError("Please enter a prompt to generate a script");
      return;
    }

    setGeneratingScript(true);
    setError("");

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: scriptPrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate script");
      }

      const data = await response.json();
      setScript(data.script);
      setScriptPrompt("");
    } catch (err: any) {
      setError(err.message || "Failed to generate script");
    } finally {
      setGeneratingScript(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!script.trim()) {
      setError("Please provide a script");
      return;
    }

    if (!videoTitle.trim()) {
      setError("Please provide a video title");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: videoTitle,
          script,
          theme: selectedTheme,
          music: selectedMusic,
          voice: selectedVoice,
          aspectRatio: selectedRatio,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start video generation");
      }

      const data = await response.json();
      router.push(`/dashboard/videos?new=${data.projectId}`);
    } catch (err: any) {
      setError(err.message || "Failed to generate video");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen grid-background relative">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <ClientDashboardHeader />
        
        <main className="flex-1 relative z-10 py-8">
        <div className="container max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Video className="h-10 w-10" />
              Create New Video
            </h1>
            <p className="text-light-text/60">
              Configure your video settings and generate AI-powered content
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Video Title */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-white" />
                Video Title
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Give your video a descriptive title
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., Product Launch Announcement"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="bg-muted/50 border-white/10 text-light-text placeholder:text-light-text/40"
              />
            </CardContent>
          </Card>

          {/* Script Section */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-white" />
                Script
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Write your script or generate one with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AI Generation */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <Label className="text-light-text mb-2 block">
                  Generate Script with AI
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe your video (e.g., 'A 30-second ad for eco-friendly water bottles')"
                    value={scriptPrompt}
                    onChange={(e) => setScriptPrompt(e.target.value)}
                    className="bg-muted/50 border-white/10 text-light-text placeholder:text-light-text/40"
                    disabled={generatingScript}
                  />
                  <Button
                    onClick={handleGenerateScript}
                    disabled={generatingScript}
                    className="bg-electric-purple hover:bg-electric-purple/90 text-white whitespace-nowrap"
                  >
                    {generatingScript ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-light-text/50 mt-2">
                  AI will create a professional script based on your description
                </p>
              </div>

              {/* Script Textarea */}
              <div>
                <Label className="text-light-text mb-2 block">
                  Video Script
                </Label>
                <Textarea
                  placeholder="Enter or paste your script here..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px] bg-muted/50 border-white/10 text-light-text placeholder:text-light-text/40"
                />
                <p className="text-xs text-light-text/50 mt-2">
                  {script.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Style Section */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Palette className="h-5 w-5 text-white" />
                Visual Style
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Choose the illustration theme for your video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {illustrationThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTheme === theme.id
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/30 bg-muted/20"
                    }`}
                  >
                    <div className="font-semibold text-light-text mb-1">
                      {theme.name}
                    </div>
                    <div className="text-xs text-light-text/60">
                      {theme.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Music Section */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Music className="h-5 w-5 text-white" />
                Background Music
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Select a music style for your video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {musicOptions.map((music) => (
                  <button
                    key={music.id}
                    onClick={() => setSelectedMusic(music.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedMusic === music.id
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/30 bg-muted/20"
                    }`}
                  >
                    <div className="font-semibold text-light-text mb-1">
                      {music.name}
                    </div>
                    <div className="text-xs text-light-text/60">
                      {music.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Voice Section */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Mic className="h-5 w-5 text-white" />
                Voice Selection
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Choose a voice for the narration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {voiceOptions.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedVoice === voice.id
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/30 bg-muted/20"
                    }`}
                  >
                    <div className="font-semibold text-light-text mb-1">
                      {voice.name}
                    </div>
                    <div className="text-xs text-light-text/60">
                      {voice.accent}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Aspect Ratio Section */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Maximize className="h-5 w-5 text-white" />
                Aspect Ratio
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Select the video dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      selectedRatio === ratio.id
                        ? "border-white bg-white/5"
                        : "border-white/10 hover:border-white/30 bg-muted/20"
                    }`}
                  >
                    <div className="text-2xl mb-2">{ratio.icon}</div>
                    <div className="font-semibold text-light-text mb-1">
                      {ratio.name}
                    </div>
                    <div className="text-xs text-light-text/60">
                      {ratio.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="sticky bottom-8 z-20">
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Ready to Generate?
                    </h3>
                    <p className="text-sm text-light-text/70">
                      Your video will be ready in 2-5 minutes
                    </p>
                  </div>
                  <Button
                    onClick={handleGenerateVideo}
                    disabled={generating || !script.trim() || !videoTitle.trim()}
                    size="lg"
                    className="bg-electric-purple hover:bg-electric-purple/90 text-white text-lg px-8 py-6"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-6 w-6" />
                        Generate Video
                      </>
                    )}
                  </Button>
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


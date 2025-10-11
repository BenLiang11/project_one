"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ClientDashboardHeader } from "@/components/client-dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  HelpCircle, 
  Mail, 
  MessageCircle,
  Book,
  Video,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ExternalLink
} from "lucide-react";

const faqs = [
  {
    question: "How long does it take to generate a video?",
    answer: "Video generation typically takes 2-5 minutes depending on the complexity and length. You'll receive an email notification when your video is ready."
  },
  {
    question: "What video formats are supported?",
    answer: "We support multiple aspect ratios including 16:9 (YouTube), 9:16 (TikTok/Reels), 1:1 (Instagram Square), and 4:5 (Instagram Portrait)."
  },
  {
    question: "Can I edit my video after it's generated?",
    answer: "Currently, videos cannot be edited after generation. However, you can create a new video with modified settings. We're working on an editing feature for future releases."
  },
  {
    question: "How many videos can I create per month?",
    answer: "The number of videos depends on your subscription plan. Starter allows 10 videos/month, Creator allows 30, Pro allows 100, and Agency has unlimited videos."
  },
  {
    question: "What AI models do you use?",
    answer: "We use GPT-4 for script generation, Leonardo AI for image generation, ElevenLabs for voiceovers, and Creatomate for video rendering."
  },
  {
    question: "Can I download my videos?",
    answer: "Yes! All completed videos can be downloaded in high quality directly from your dashboard. Videos are stored for 90 days."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day money-back guarantee for all new subscriptions. Contact support if you're not satisfied with our service."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription anytime from the Subscription page. Your access will continue until the end of your billing period."
  }
];

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of creating your first video",
    icon: Book,
    link: "#",
    color: "electric-purple"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step video guides",
    icon: Video,
    link: "#",
    color: "medium-orchid"
  },
  {
    title: "Documentation",
    description: "Comprehensive API and feature docs",
    icon: FileText,
    link: "#",
    color: "medium-orchid"
  },
  {
    title: "Community Forum",
    description: "Connect with other users",
    icon: MessageCircle,
    link: "#",
    color: "electric-purple"
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      console.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen grid-background relative">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <ClientDashboardHeader />
        
        <main className="flex-1 relative z-10 py-8">
        <div className="container max-w-5xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <HelpCircle className="h-10 w-10" />
              Help & Support
            </h1>
            <p className="text-light-text/60">
              Get help, find answers, and contact our support team
            </p>
          </div>

          {/* Quick Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.link}
                  className="p-4 rounded-lg bg-card/80 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all hover:scale-105 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-light-text mb-1">{resource.title}</h3>
                  <p className="text-xs text-light-text/60">{resource.description}</p>
                  <ExternalLink className="h-4 w-4 text-light-text/40 mt-2" />
                </a>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/80 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-light-text">
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-light-text/60">
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg overflow-hidden bg-muted/20"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium text-light-text pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-white flex-shrink-0 transition-transform ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <div className="px-4 pb-4 text-light-text/70 text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-card/80 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-light-text flex items-center gap-2">
                    <Mail className="h-5 w-5 text-white" />
                    Other Ways to Reach Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium text-light-text mb-1">Email Support</div>
                    <a href="mailto:support@clippilot.com" className="text-white hover:underline text-sm">
                      support@clippilot.com
                    </a>
                    <p className="text-xs text-light-text/60 mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                  <div>
                    <div className="font-medium text-light-text mb-1">Live Chat</div>
                    <p className="text-sm text-light-text/70">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                    <Button size="sm" className="mt-2 bg-white/10 hover:bg-white/20 text-white border border-white/20">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <Card className="bg-card/80 backdrop-blur-md border-white/10 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-light-text">Send a Message</CardTitle>
                  <CardDescription className="text-light-text/60">
                    We&apos;ll get back to you soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success ? (
                    <div className="p-6 text-center">
                      <CheckCircle2 className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="font-semibold text-light-text mb-2">Message Sent!</h3>
                      <p className="text-sm text-light-text/60">
                        We&apos;ll respond to your inquiry within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-light-text">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="What do you need help with?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="bg-muted/50 border-white/10 text-light-text"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-light-text">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue in detail..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={6}
                          className="bg-muted/50 border-white/10 text-light-text placeholder:text-light-text/40"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}


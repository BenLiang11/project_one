"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Check, Zap, Sparkles, TrendingUp, Users } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    description: "Perfect for individuals getting started",
    monthlyPrice: 19,
    yearlyPrice: 171,
    color: "electric-purple",
    features: [
      "10 videos per month",
      "Up to 60 seconds per video",
      "HD quality (1080p)",
      "Basic templates",
      "Email support",
      "Watermark-free videos",
    ],
  },
  {
    name: "Creator",
    icon: Zap,
    description: "For content creators and marketers",
    monthlyPrice: 39,
    yearlyPrice: 351,
    color: "medium-orchid",
    popular: true,
    features: [
      "30 videos per month",
      "Up to 120 seconds per video",
      "4K quality available",
      "Premium templates",
      "Priority email support",
      "Custom voiceovers",
      "Advanced AI features",
      "Brand kit",
    ],
  },
  {
    name: "Pro",
    icon: TrendingUp,
    description: "For professionals and small teams",
    monthlyPrice: 59,
    yearlyPrice: 531,
    color: "light-purple",
    features: [
      "100 videos per month",
      "Up to 300 seconds per video",
      "4K quality",
      "All templates",
      "Priority support (24/7)",
      "Custom branding",
      "API access",
      "Team collaboration (3 users)",
      "Advanced analytics",
    ],
  },
  {
    name: "Agency",
    icon: Users,
    description: "For agencies and large teams",
    monthlyPrice: 99,
    yearlyPrice: 891,
    color: "electric-purple",
    features: [
      "Unlimited videos",
      "Unlimited video length",
      "4K quality",
      "All templates + custom",
      "Dedicated account manager",
      "White-label options",
      "Full API access",
      "Unlimited team members",
      "Advanced analytics + reporting",
      "Custom integrations",
    ],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col min-h-screen grid-background relative">
      <Navbar />

      <main className="flex-1 relative z-10 py-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-electric-purple">Choose Your</span> <span className="accent-gradient-text">Perfect Plan</span>
            </h1>
            <p className="text-lg text-light-text/60 max-w-2xl mx-auto">
              Start creating AI-powered videos today. All plans include core features.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsYearly(false)}
              className={`text-lg font-medium transition-colors ${!isYearly ? "text-light-text" : "text-light-text/50 hover:text-light-text/70"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-all ${
                isYearly ? "bg-electric-purple shadow-lg shadow-electric-purple/30" : "bg-muted hover:bg-muted/80"
              }`}
              aria-label="Toggle billing period"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isYearly ? "translate-x-8" : "translate-x-0"
                } shadow-lg`}
              />
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`text-lg font-medium transition-colors ${isYearly ? "text-light-text" : "text-light-text/50 hover:text-light-text/70"}`}
            >
              Yearly
            </button>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-medium-orchid/20 border border-medium-orchid/50">
                  <Sparkles className="h-4 w-4 text-medium-orchid" />
                  <span className="text-sm font-semibold text-medium-orchid">Save 25%</span>
                </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto mb-20 px-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const monthlySavings = isYearly ? (plan.monthlyPrice - plan.yearlyPrice / 12) : 0;

              return (
                <Card
                  key={plan.name}
                  className={`relative bg-card/80 backdrop-blur-md transition-all flex flex-col hover:scale-105 ${
                    plan.popular ? "ring-2 ring-electric-purple shadow-lg shadow-electric-purple/20 border-electric-purple/50" : "border-electric-purple/30 hover:border-electric-purple/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-electric-purple text-white text-sm font-semibold">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className={plan.popular ? "pt-8" : ""}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      plan.name === "Starter" || plan.name === "Agency" 
                        ? "bg-electric-purple/20 border border-electric-purple/30"
                            : plan.name === "Creator"
                            ? "bg-medium-orchid/20 border border-medium-orchid/30"
                            : "bg-light-purple/20 border border-light-purple/30"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        plan.name === "Starter" || plan.name === "Agency"
                          ? "text-electric-purple"
                                  : plan.name === "Creator"
                                  ? "text-medium-orchid"
                                  : "text-light-purple"
                      }`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-light-text">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-light-text/60">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-light-text">
                          ${displayPrice}
                        </span>
                        <span className="text-light-text/60">
                          {isYearly ? "/year" : "/month"}
                        </span>
                      </div>
                      {isYearly && (
                        <div className="flex flex-col gap-1">
                          <div className="text-sm text-medium-orchid font-medium">
                            ${(displayPrice / 12).toFixed(0)}/month billed yearly
                          </div>
                          <div className="text-xs text-light-text/50 line-through">
                            Was ${plan.monthlyPrice}/month
                          </div>
                          <div className="inline-flex items-center gap-1 text-xs text-medium-orchid">
                            <Sparkles className="h-3 w-3" />
                            Save ${(monthlySavings * 12).toFixed(0)}/year
                          </div>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                            plan.name === "Starter" || plan.name === "Agency"
                              ? "text-electric-purple"
                              : plan.name === "Creator"
                              ? "text-medium-orchid"
                              : "text-light-purple"
                          }`} />
                          <span className="text-sm text-light-text/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Link href="/signup" className="w-full">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-electric-purple hover:bg-electric-purple/90 text-white"
                            : "bg-muted/50 hover:bg-muted text-light-text border border-electric-purple/30"
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-light-text mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/20">
                <h3 className="text-lg font-semibold text-light-text mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-light-text/60">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/20">
                <h3 className="text-lg font-semibold text-light-text mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-light-text/60">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/20">
                <h3 className="text-lg font-semibold text-light-text mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-light-text/60">
                  Yes! All plans come with a 7-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center p-8 rounded-lg bg-card/50 backdrop-blur-sm border border-electric-purple/30">
              <h3 className="text-2xl font-bold text-light-text mb-2">
                Still have questions?
              </h3>
              <p className="text-light-text/60 mb-6">
                Our team is here to help you choose the right plan
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-electric-purple/50 text-light-text hover:bg-electric-purple/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


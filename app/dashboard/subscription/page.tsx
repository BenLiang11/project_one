"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { ClientDashboardHeader } from "@/components/client-dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Calendar,
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  ArrowUpCircle
} from "lucide-react";

const billingHistory = [
  { date: "Dec 1, 2024", amount: "$19.00", status: "Paid", invoice: "#INV-001" },
  { date: "Nov 1, 2024", amount: "$19.00", status: "Paid", invoice: "#INV-002" },
  { date: "Oct 1, 2024", amount: "$19.00", status: "Paid", invoice: "#INV-003" },
];

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock current subscription data
  const currentPlan = {
    name: "Starter",
    price: 19,
    billingCycle: "monthly",
    renewalDate: "January 1, 2025",
    videosUsed: 3,
    videosLimit: 10,
  };

  const handleUpgrade = () => {
    window.location.href = "/pricing";
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Subscription cancelled successfully. Access continues until " + currentPlan.renewalDate);
      setShowCancelModal(false);
    } catch (error) {
      console.error("Failed to cancel subscription");
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
              <CreditCard className="h-10 w-10" />
              Subscription
            </h1>
            <p className="text-light-text/60">
              Manage your plan, billing, and payment methods
            </p>
          </div>

          {/* Current Plan Overview */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-white" />
                    <span className="text-sm font-medium text-white">Current Plan</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentPlan.name}
                  </h2>
                  <p className="text-light-text/70 mb-4">
                    ${currentPlan.price}/{currentPlan.billingCycle}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-light-text/60">
                    <Calendar className="h-4 w-4" />
                    Renews on {currentPlan.renewalDate}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleUpgrade}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    <ArrowUpCircle className="mr-2 h-5 w-5" />
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelModal(true)}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Usage Stats */}
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Videos This Month
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-light-text">
                  {currentPlan.videosUsed}/{currentPlan.videosLimit}
                </div>
                <div className="mt-3 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{ width: `${(currentPlan.videosUsed / currentPlan.videosLimit) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-light-text/60 mt-2">
                  {currentPlan.videosLimit - currentPlan.videosUsed} videos remaining
                </p>
              </CardContent>
            </Card>

            {/* Next Billing */}
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Next Billing
                </CardTitle>
                <Clock className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-light-text">${currentPlan.price}</div>
                <p className="text-xs text-light-text/60 mt-1">
                  on {currentPlan.renewalDate}
                </p>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-card/80 backdrop-blur-md border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-light-text/80">
                  Status
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Active</div>
                <p className="text-xs text-light-text/60 mt-1">
                  All features available
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text">Payment Method</CardTitle>
              <CardDescription className="text-light-text/60">
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-muted/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-white/10 border border-white/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-light-text">•••• •••• •••• 4242</div>
                    <div className="text-sm text-light-text/60">Expires 12/2025</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-white/20 text-light-text hover:bg-white/5"
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text">Billing History</CardTitle>
              <CardDescription className="text-light-text/60">
                View and download past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billingHistory.map((bill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-light-text">{bill.date}</div>
                        <div className="text-sm text-light-text/60">{bill.invoice}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-light-text">{bill.amount}</div>
                        <div className="text-sm text-white">{bill.status}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-light-text/60 hover:text-light-text"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Promotion */}
          <Card className="bg-card/80 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <ArrowUpCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Need More Videos?
                  </h3>
                  <p className="text-light-text/70 mb-4">
                    Upgrade to Creator or Pro for more monthly videos, longer duration, and priority support.
                  </p>
                  <Link href="/pricing">
                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                      View All Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-card/95 backdrop-blur-md border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Cancel Subscription
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Are you sure you want to cancel?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-light-text/70">
                Your subscription will remain active until {currentPlan.renewalDate}. After that, you'll lose access to:
              </p>
              <ul className="space-y-2 text-sm text-light-text/60">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Video generation features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Access to your video library</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Premium templates and features</span>
                </li>
              </ul>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 border-white/20 text-light-text"
                >
                  Keep Subscription
                </Button>
                <Button
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  variant="destructive"
                  className="flex-1 bg-destructive hover:bg-destructive/90"
                >
                  {loading ? "Cancelling..." : "Yes, Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


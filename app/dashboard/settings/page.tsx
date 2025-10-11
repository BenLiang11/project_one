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
  User, 
  Lock, 
  Bell, 
  Palette, 
  AlertTriangle,
  Save,
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Account Settings
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState("");

  // Password Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [videoCompleteNotif, setVideoCompleteNotif] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Notification preferences saved!");
    } catch {
      setError("Failed to save preferences");
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
        <div className="container max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <User className="h-10 w-10" />
              Settings
            </h1>
            <p className="text-light-text/60">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Account Settings */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <User className="h-5 w-5 text-white" />
                Account Information
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name" className="text-light-text">
                  Display Name
                </Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-light-text">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-light-text">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text placeholder:text-light-text/40"
                />
                <p className="text-xs text-light-text/50">
                  {bio.length}/200 characters
                </p>
              </div>

              <Button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Lock className="h-5 w-5 text-white" />
                Change Password
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-light-text">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-light-text">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text"
                />
                <p className="text-xs text-light-text/50">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-light-text">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-muted/50 border-white/10 text-light-text"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Bell className="h-5 w-5 text-white" />
                Notifications
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-light-text">Email Notifications</Label>
                  <p className="text-sm text-light-text/60">
                    Receive notifications via email
                  </p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? "bg-white" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      emailNotifications ? "translate-x-6" : "translate-x-0"
                    } shadow-lg`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-light-text">Video Completion</Label>
                  <p className="text-sm text-light-text/60">
                    Get notified when your videos are ready
                  </p>
                </div>
                <button
                  onClick={() => setVideoCompleteNotif(!videoCompleteNotif)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    videoCompleteNotif ? "bg-white" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      videoCompleteNotif ? "translate-x-6" : "translate-x-0"
                    } shadow-lg`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-light-text">Marketing Emails</Label>
                  <p className="text-sm text-light-text/60">
                    Receive updates about new features and offers
                  </p>
                </div>
                <button
                  onClick={() => setMarketingEmails(!marketingEmails)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    marketingEmails ? "bg-white" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      marketingEmails ? "translate-x-6" : "translate-x-0"
                    } shadow-lg`}
                  />
                </button>
              </div>

              <Button
                onClick={handleSaveNotifications}
                disabled={loading}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="mb-6 bg-card/80 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-light-text flex items-center gap-2">
                <Palette className="h-5 w-5 text-white" />
                Appearance
              </CardTitle>
              <CardDescription className="text-light-text/60">
                Customize how Clip Pilot looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-light-text">Theme</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg border-2 border-white bg-white/5 text-left">
                    <div className="font-semibold text-light-text mb-1">
                      Dark
                    </div>
                    <div className="text-xs text-light-text/60">
                      Current theme
                    </div>
                  </button>
                  <button className="p-4 rounded-lg border-2 border-white/10 hover:border-white/20 bg-muted/20 text-left opacity-50 cursor-not-allowed">
                    <div className="font-semibold text-light-text mb-1">
                      Light
                    </div>
                    <div className="text-xs text-light-text/60">
                      Coming soon
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-light-text">Language</Label>
                <div className="text-sm text-light-text/60">
                  English (US)
                  <span className="ml-2 text-xs bg-white/10 text-white px-2 py-1 rounded">
                    Default
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
      </div>
    </div>
  );
}


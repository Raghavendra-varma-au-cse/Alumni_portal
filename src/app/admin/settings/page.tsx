"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    portalName: "Alma University Alumni Portal",
    adminEmail: "admin@almauni.edu",
    maintenanceMode: false,
    eventsFeature: true,
    jobsFeature: true,
    mentorshipFeature: true,
    donationsFeature: true,
    resourcesFeature: true,
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "username",
    smtpPassword: "••••••••",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Here you would typically send the settings to your backend
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Portal Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure global settings for the Alumni Portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="portalName">Portal Name</Label>
                <Input
                  type="text"
                  id="por talName"
                  name="portalName"
                  value={settings.portalName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={settings.adminEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={() => handleSwitchChange("maintenanceMode")}
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable specific features of the Alumni Portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="eventsFeature"
                  checked={settings.eventsFeature}
                  onCheckedChange={() => handleSwitchChange("eventsFeature")}
                />
                <Label htmlFor="eventsFeature">Events Feature</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="jobsFeature"
                  checked={settings.jobsFeature}
                  onCheckedChange={() => handleSwitchChange("jobsFeature")}
                />
                <Label htmlFor="jobsFeature">Jobs Feature</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="mentorshipFeature"
                  checked={settings.mentorshipFeature}
                  onCheckedChange={() =>
                    handleSwitchChange("mentorshipFeature")
                  }
                />
                <Label htmlFor="mentorshipFeature">Mentorship Feature</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="donationsFeature"
                  checked={settings.donationsFeature}
                  onCheckedChange={() => handleSwitchChange("donationsFeature")}
                />
                <Label htmlFor="donationsFeature">Donations Feature</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="resourcesFeature"
                  checked={settings.resourcesFeature}
                  onCheckedChange={() => handleSwitchChange("resourcesFeature")}
                />
                <Label htmlFor="resourcesFeature">Resources Feature</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure SMTP settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input
                  type="text"
                  id="smtpServer"
                  name="smtpServer"
                  value={settings.smtpServer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  type="text"
                  id="smtpPort"
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  type="text"
                  id="smtpUsername"
                  name="smtpUsername"
                  value={settings.smtpUsername}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  type="password"
                  id="smtpPassword"
                  name="smtpPassword"
                  value={settings.smtpPassword}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
}

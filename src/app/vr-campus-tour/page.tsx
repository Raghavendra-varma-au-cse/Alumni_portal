"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Glasses, Calendar, Users, Clock, Volume2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type Tour = {
  id: string;
  name: string;
  duration: number;
  capacity: number;
  date: string;
  guide: string;
};

export default function VRCampusTours() {
  const [tours] = useState<Tour[]>([
    {
      id: "1",
      name: "Historical Campus Tour",
      duration: 45,
      capacity: 20,
      date: "2023-07-15",
      guide: "Prof. Smith",
    },
    {
      id: "2",
      name: "New Buildings Showcase",
      duration: 30,
      capacity: 15,
      date: "2023-07-20",
      guide: "Dr. Johnson",
    },
    {
      id: "3",
      name: "Student Life Experience",
      duration: 60,
      capacity: 25,
      date: "2023-07-25",
      guide: "Sarah Brown",
    },
  ]);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [movementSpeed, setMovementSpeed] = useState(50);

  const handleJoinTour = (tourId: string) => {
    const tour = tours.find((t) => t.id === tourId);
    if (tour) {
      toast({
        title: "Tour Joined",
        description: `You have successfully joined the ${tour.name} tour.`,
      });
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your VR tour settings have been updated.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Virtual Reality Campus Tours</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Tours</TabsTrigger>
          <TabsTrigger value="settings">VR Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Card key={tour.id}>
                <CardHeader>
                  <CardTitle>{tour.name}</CardTitle>
                  <CardDescription>Guided by {tour.guide}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{tour.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{tour.duration} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{tour.capacity} participants</span>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => handleJoinTour(tour.id)}
                  >
                    <Glasses className="mr-2 h-4 w-4" /> Join VR Tour
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>VR Experience Settings</CardTitle>
              <CardDescription>
                Customize your virtual tour experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="audio">Audio Narration</Label>
                  <p className="text-sm text-gray-500">
                    Enable audio guidance during the tour
                  </p>
                </div>
                <Switch
                  id="audio"
                  checked={audioEnabled}
                  onCheckedChange={setAudioEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="subtitles">Subtitles</Label>
                  <p className="text-sm text-gray-500">
                    Display subtitles for narration and information
                  </p>
                </div>
                <Switch
                  id="subtitles"
                  checked={subtitlesEnabled}
                  onCheckedChange={setSubtitlesEnabled}
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="movement-speed">Movement Speed</Label>
                <div className="flex items-center space-x-4">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    id="movement-speed"
                    min={0}
                    max={100}
                    step={1}
                    value={[movementSpeed]}
                    onValueChange={(value) => setMovementSpeed(value[0])}
                    className="flex-grow"
                  />
                  <span className="font-medium">{movementSpeed}%</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

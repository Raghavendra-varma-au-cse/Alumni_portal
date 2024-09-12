"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Video } from "lucide-react";

// This would typically come from an API call
const getSessions = () => {
  return [
    {
      id: 1,
      mentor: "Alice Johnson",
      topic: "Career Guidance",
      date: "2023-06-20",
      time: "14:00",
      status: "Upcoming",
    },
    {
      id: 2,
      mentor: "Bob Smith",
      topic: "Interview Preparation",
      date: "2023-06-22",
      time: "10:00",
      status: "Upcoming",
    },
    {
      id: 3,
      mentor: "Carol Williams",
      topic: "Resume Review",
      date: "2023-06-15",
      time: "11:00",
      status: "Completed",
    },
  ];
};

export default function StudentSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getSessions();
    setSessions(data);
  }, []);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">My Mentorship Sessions</h1>

      <div className="space-y-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {session.mentor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{session.mentor}</CardTitle>
                    <CardDescription>{session.topic}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    session.status === "Upcoming" ? "default" : "secondary"
                  }
                >
                  {session.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {session.date} at {session.time}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {session.status === "Upcoming" && (
                <Link href={`/student/video-chat/${session.id}`}>
                  <Button>
                    <Video className="mr-2 h-4 w-4" />
                    Join Session
                  </Button>
                </Link>
              )}
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

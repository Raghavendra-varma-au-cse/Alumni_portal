"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, MessageSquare, BookOpen } from "lucide-react";

// This would typically come from an API call
const getNotifications = () => {
  return [
    {
      id: 1,
      type: "mentorship",
      title: "New mentorship session scheduled",
      message:
        "You have a new mentorship session with Alice Johnson on June 20th at 2:00 PM.",
      date: "2023-06-15",
      read: false,
    },
    {
      id: 2,
      type: "course",
      title: "New course available",
      message:
        'A new course "Advanced Machine Learning" is now available. Enroll now!',
      date: "2023-06-14",
      read: true,
    },
    {
      id: 3,
      type: "message",
      title: "New message from mentor",
      message: "You have a new message from your mentor Bob Smith.",
      date: "2023-06-13",
      read: false,
    },
    {
      id: 4,
      type: "mentorship",
      title: "Mentorship request accepted",
      message: "Your mentorship request has been accepted by Carol Williams.",
      date: "2023-06-12",
      read: true,
    },
  ];
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getNotifications();
    setNotifications(data);
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "mentorship":
        return <Calendar className="h-5 w-5" />;
      case "course":
        return <BookOpen className="h-5 w-5" />;
      case "message":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.read ? "bg-muted" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(notification.type)}
                  <CardTitle>{notification.title}</CardTitle>
                </div>
                {!notification.read && <Badge>New</Badge>}
              </div>
              <CardDescription>{notification.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{notification.message}</p>
            </CardContent>
            <CardFooter>
              {!notification.read && (
                <Button
                  variant="outline"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

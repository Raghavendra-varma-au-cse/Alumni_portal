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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// This would typically come from an API call
const getMentorshipRequests = () => {
  return [
    {
      id: 1,
      mentee: {
        name: "Alex Johnson",
        role: "Junior Developer",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
      topic: "Advanced Programming Techniques",
      requestDate: "2023-06-01",
      message:
        "I'm looking to improve my skills in advanced programming techniques, particularly in areas like design patterns and algorithm optimization.",
    },
    {
      id: 2,
      mentee: {
        name: "Sarah Lee",
        role: "Computer Science Student",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
      topic: "Career Advice in Tech Industry",
      requestDate: "2023-06-03",
      message:
        "I'm a final year CS student looking for guidance on how to start my career in the tech industry. I'd love to get your insights on job search strategies and interview preparation.",
    },
  ];
};

export default function MentorshipRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getMentorshipRequests();
    setRequests(data);
  }, []);

  const handleAcceptRequest = (requestId) => {
    // In a real app, this would be an API call to accept the request
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  const handleDeclineRequest = (requestId) => {
    // In a real app, this would be an API call to decline the request
    setRequests(requests.filter((request) => request.id !== requestId));
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mentorship Requests</h1>

      <div className="space-y-6">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={request.mentee.imageUrl}
                    alt={request.mentee.name}
                  />
                  <AvatarFallback>
                    {request.mentee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{request.mentee.name}</CardTitle>
                  <CardDescription>{request.mentee.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Topic:</strong> {request.topic}
              </p>
              <p>
                <strong>Requested:</strong> {request.requestDate}
              </p>
              <p className="mt-2">{request.message}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mentorship Request Details</DialogTitle>
                    <DialogDescription>
                      Request from {request.mentee.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      <strong>Topic:</strong> {request.topic}
                    </p>
                    <p>
                      <strong>Requested:</strong> {request.requestDate}
                    </p>
                    <p>
                      <strong>Message:</strong>
                    </p>
                    <Textarea
                      readOnly
                      value={request.message}
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline
                    </Button>
                    <Button onClick={() => handleAcceptRequest(request.id)}>
                      Accept
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleDeclineRequest(request.id)}
                >
                  Decline
                </Button>
                <Button onClick={() => handleAcceptRequest(request.id)}>
                  Accept
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Trophy } from "lucide-react";

export default function FeedbackAndPoints() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [points, setPoints] = useState(100); // Example initial points

  const mentees = [
    {
      id: 1,
      name: "John Doe",
      imageUrl: "/placeholder.svg?height=50&width=50",
      lastSession: "2023-06-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      imageUrl: "/placeholder.svg?height=50&width=50",
      lastSession: "2023-06-10",
    },
  ];

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real application, this would send the feedback to the backend
    console.log("Feedback submitted:", { feedback, rating });
    setFeedback("");
    setRating(0);
    // Increase points for submitting feedback
    setPoints(points + 10);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Provide Feedback</CardTitle>
              <CardDescription>
                Share your thoughts on your recent mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mentee">Select Mentee</Label>
                  <select id="mentee" className="w-full border rounded-md p-2">
                    {mentees.map((mentee) => (
                      <option key={mentee.id} value={mentee.id}>
                        {mentee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <Button type="submit">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Mentor Points</CardTitle>
              <CardDescription>
                Earn points by being an active mentor
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-4xl font-bold">{points}</p>
              <p className="text-muted-foreground">Total Points</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Earn points by completing sessions, providing feedback, and
                sharing resources.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Mentees</CardTitle>
          <CardDescription>
            Provide feedback for your recent mentoring sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentees.map((mentee) => (
              <div
                key={mentee.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={mentee.imageUrl} alt={mentee.name} />
                    <AvatarFallback>
                      {mentee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{mentee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Last session: {mentee.lastSession}
                    </p>
                  </div>
                </div>
                <Button variant="outline">Provide Feedback</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

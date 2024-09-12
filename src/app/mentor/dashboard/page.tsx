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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  BarChart2,
  PlusCircle,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function MentorDashboard() {
  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, student: "Alice Johnson", date: "2023-07-15", time: "14:00" },
    { id: 2, student: "Bob Smith", date: "2023-07-16", time: "15:30" },
    { id: 3, student: "Carol Williams", date: "2023-07-17", time: "11:00" },
  ]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Mentor Dashboard</h1>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Mentor" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sessions This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quizzes Created
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Session Rating
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled mentoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingSessions.map((session) => (
                <li
                  key={session.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{session.student[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.student}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} at {session.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Join</Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your mentoring activities</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/mentor/requests">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Sessions
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href="/mentor/manage-quizzes">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Quizzes
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href="/mentor/mentee-progress">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Mentee Progress
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href="/mentor/resources">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Resources
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href="/mentor/manage-openings">
                <Briefcase className="mr-2 h-4 w-4" />
                Manage Job/Internship Openings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

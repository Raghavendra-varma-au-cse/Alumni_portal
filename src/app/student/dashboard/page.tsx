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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  BarChart2,
  GraduationCap,
  Briefcase,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      mentor: "Alice Johnson",
      date: "2023-07-15",
      time: "14:00",
      topic: "Career Guidance",
    },
    {
      id: 2,
      mentor: "Bob Smith",
      date: "2023-07-18",
      time: "15:30",
      topic: "Technical Interview Prep",
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "quiz",
      name: "Web Development Fundamentals",
      score: 85,
      date: "2023-07-10",
    },
    {
      id: 2,
      type: "session",
      name: "Mentoring Session with Carol Williams",
      date: "2023-07-08",
    },
    {
      id: 3,
      type: "course",
      name: "Introduction to Machine Learning",
      progress: 60,
      date: "2023-07-05",
    },
  ]);

  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      title: "Junior Software Developer",
      company: "Tech Innovators",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Data Insights Co.",
      location: "New York, NY",
      type: "Internship",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Creative Solutions",
      location: "Remote",
      type: "Contract",
    },
  ]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John Doe</p>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">
              Computer Science, Class of 2024
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mentoring Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">attended this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quizzes Completed
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">avg. score 82%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Mentoring Sessions</TabsTrigger>
          <TabsTrigger value="jobboard">Job Board</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Your latest learning activities and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <ul className="space-y-4">
                    {recentActivities.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-center space-x-4"
                      >
                        {activity.type === "quiz" && (
                          <BarChart2 className="h-6 w-6 text-blue-500" />
                        )}
                        {activity.type === "session" && (
                          <Users className="h-6 w-6 text-green-500" />
                        )}
                        {activity.type === "course" && (
                          <BookOpen className="h-6 w-6 text-yellow-500" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                        {activity.type === "quiz" && (
                          <Badge variant="secondary">
                            Score: {activity.score}%
                          </Badge>
                        )}
                        {activity.type === "course" && (
                          <Progress
                            value={activity.progress}
                            className="w-20"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Mentoring Sessions</CardTitle>
                <CardDescription>
                  Your scheduled sessions with mentors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <ul className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <li
                        key={session.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{session.mentor[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.mentor}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.topic}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.date} at {session.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Join</Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>All Mentoring Sessions</CardTitle>
              <CardDescription>
                View and manage all your mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <ul className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <li
                      key={session.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{session.mentor[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.mentor}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.topic}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {session.date} at {session.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Join</Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Session
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="jobboard">
          <Card>
            <CardHeader>
              <CardTitle>Job Board</CardTitle>
              <CardDescription>
                Explore job opportunities tailored for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <ul className="space-y-4">
                  {jobListings.map((job) => (
                    <li
                      key={job.id}
                      className="flex flex-col space-y-2 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                        <Badge>{job.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <Button variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Briefcase className="mr-2 h-4 w-4" />
                View All Jobs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button className="w-full justify-start" asChild>
          <Link href="/student/courses">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/student/mentors">
            <Users className="mr-2 h-4 w-4" />
            Find Mentors
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/student/job-board">
            <Briefcase className="mr-2 h-4 w-4" />
            Job Board
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/student/profile">
            <GraduationCap className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}

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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Award } from "lucide-react";

// This would typically come from an API call
const getCourses = () => {
  return [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Alice Johnson",
      duration: "4 weeks",
      level: "Beginner",
      enrolled: false,
      progress: 0,
    },
    {
      id: 2,
      title: "Advanced Machine Learning",
      instructor: "Bob Smith",
      duration: "8 weeks",
      level: "Advanced",
      enrolled: true,
      progress: 60,
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      instructor: "Carol Williams",
      duration: "6 weeks",
      level: "Intermediate",
      enrolled: false,
      progress: 0,
    },
  ];
};

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getCourses();
    setCourses(data);
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEnroll = (courseId) => {
    // In a real app, this would be an API call to enroll in the course
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course,
      ),
    );
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Courses</h1>

      <div className="mb-8">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <Award className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              {course.enrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              )}
            </CardContent>
            <CardFooter>
              {course.enrolled ? (
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

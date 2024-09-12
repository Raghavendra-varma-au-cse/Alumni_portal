"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

// This would typically come from an API call
const getMentorData = (id) => {
  return {
    id,
    name: "Alice Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    expertise: ["Web Development", "Machine Learning", "Cloud Computing"],
    imageUrl: "/placeholder.svg?height=200&width=200",
    bio: "Experienced software engineer with 10+ years in the industry. Passionate about mentoring and helping others grow in their tech careers.",
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Tech Corp",
        years: "2018-Present",
      },
      {
        role: "Software Developer",
        company: "Startup Inc",
        years: "2013-2018",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Tech University",
        year: "2013",
      },
      {
        degree: "B.S. Computer Science",
        school: "State University",
        year: "2011",
      },
    ],
  };
};

export default function MentorProfile() {
  const params = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const mentorData = getMentorData(params.id);
    setMentor(mentorData);
  }, [params.id]);

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
              <AvatarFallback>
                {mentor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl font-bold">
                {mentor.name}
              </CardTitle>
              <CardDescription className="text-xl">
                {mentor.role} at {mentor.company}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p>{mentor.bio}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            {mentor.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-medium">{exp.role}</h4>
                <p className="text-sm text-muted-foreground">
                  {exp.company} | {exp.years}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {mentor.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">
                  {edu.school} | {edu.year}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/student/find-mentors/request?mentor=${mentor.id}`}>
            <Button size="lg">Request Mentorship</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

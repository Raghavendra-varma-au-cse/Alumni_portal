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
import { FileText, Video, Link, Download } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Resume Writing Guide",
    type: "document",
    icon: FileText,
    link: "/documents/resume-guide.pdf",
  },
  {
    id: 2,
    title: "Interview Tips Video",
    type: "video",
    icon: Video,
    link: "/videos/interview-tips.mp4",
  },
  {
    id: 3,
    title: "Job Search Strategies",
    type: "link",
    icon: Link,
    link: "https://example.com/job-search-tips",
  },
  {
    id: 4,
    title: "Cover Letter Template",
    type: "document",
    icon: FileText,
    link: "/documents/cover-letter-template.docx",
  },
  {
    id: 5,
    title: "Networking Techniques",
    type: "video",
    icon: Video,
    link: "/videos/networking-techniques.mp4",
  },
  {
    id: 6,
    title: "Career Development Plan",
    type: "document",
    icon: FileText,
    link: "/documents/career-development-plan.pdf",
  },
];

export default function CareerResources() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Career Resources</h1>

      <div className="mb-8">
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <resource.icon className="h-5 w-5" />
                <span>{resource.title}</span>
              </CardTitle>
              <CardDescription>{resource.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {resource.type === "link"
                  ? "External resource"
                  : "Downloadable content"}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.type === "link" ? "Visit" : "Download"}
                  {resource.type === "link" ? (
                    <Link className="ml-2 h-4 w-4" />
                  ) : (
                    <Download className="ml-2 h-4 w-4" />
                  )}
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

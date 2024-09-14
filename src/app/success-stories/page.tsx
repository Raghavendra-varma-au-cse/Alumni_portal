"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Globe,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for success stories
const successStories = [
  {
    id: 1,
    name: "John Doe",
    graduationYear: 2015,
    industry: "Technology",
    company: "Google",
    location: "Mountain View, CA",
    story:
      "After graduating, I joined Google as a software engineer. I've since worked on projects that have impacted millions of users worldwide.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: "Jane Smith",
    graduationYear: 2018,
    industry: "Healthcare",
    company: "Mayo Clinic",
    location: "Rochester, MN",
    story:
      "I'm now leading groundbreaking research in cancer treatment at Mayo Clinic, applying the skills I learned during my time at the university.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    name: "Alex Johnson",
    graduationYear: 2020,
    industry: "Finance",
    company: "JPMorgan Chase",
    location: "New York, NY",
    story:
      "Within two years of graduation, I've become a key player in JPMorgan's blockchain initiative, revolutionizing how we think about financial transactions.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    name: "Emily Chen",
    graduationYear: 2017,
    industry: "Education",
    company: "Khan Academy",
    location: "Mountain View, CA",
    story:
      "At Khan Academy, I'm developing innovative online learning tools that are making quality education accessible to students worldwide.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    name: "Michael Brown",
    graduationYear: 2016,
    industry: "Entertainment",
    company: "Netflix",
    location: "Los Angeles, CA",
    story:
      "I'm now a lead product manager at Netflix, shaping the future of how people consume entertainment globally.",
    image: "/placeholder.svg?height=400&width=600",
  },
];

const industries = [
  "All",
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Entertainment",
];
const years = ["All", "2020-2023", "2015-2019", "2010-2014", "Before 2010"];

export default function SuccessStoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filteredStories = successStories.filter((story) => {
    const matchesSearch =
      story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.story.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All" || story.industry === selectedIndustry;
    const matchesYear =
      selectedYear === "All" ||
      (selectedYear === "2020-2023" && story.graduationYear >= 2020) ||
      (selectedYear === "2015-2019" &&
        story.graduationYear >= 2015 &&
        story.graduationYear < 2020) ||
      (selectedYear === "2010-2014" &&
        story.graduationYear >= 2010 &&
        story.graduationYear < 2015) ||
      (selectedYear === "Before 2010" && story.graduationYear < 2010);
    return matchesSearch && matchesIndustry && matchesYear;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Alumni Success Stories
      </h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="overflow-hidden">
                <Image
                  src={story.image}
                  alt={`${story.name}'s success story`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{story.name}</CardTitle>
                      <CardDescription>{story.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{story.story}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {story.graduationYear}
                    </Badge>
                    <Badge variant="secondary">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {story.industry}
                    </Badge>
                    <Badge variant="secondary">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredStories.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No stories found. Try adjusting your search or filters.
        </p>
      )}

      <Card className="mt-12 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">
            Interactive Alumni Timeline
          </CardTitle>
          <CardDescription>
            Explore our alumni&apos;s journeys through the years
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-primary to-primary-foreground p-6">
            <ScrollArea className="h-[400px]">
              <div className="relative">
                {successStories.map((story, index) => (
                  <div key={story.id} className="mb-8 flex items-center">
                    <div className="absolute left-0 w-4 h-4 bg-primary-foreground rounded-full"></div>
                    <div className="ml-8 p-4 bg-background rounded-lg shadow-lg">
                      <h3 className="font-bold">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {story.graduationYear} - {story.company}
                      </p>
                      <p className="mt-2">{story.story}</p>
                    </div>
                  </div>
                ))}
                <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-primary-foreground"></div>
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Alumni Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Connect with fellow alumni and expand your professional network.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/alumni/network">Explore Network</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover upcoming alumni events and reunions near you.</p>
            <Button className="mt-4" asChild>
              <Link href="/events">See Events</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2" />
              Stay Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sign up for our newsletter to stay updated with alumni news.</p>
            <Button className="mt-4" asChild>
              <Link href="/newsletter">Subscribe</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

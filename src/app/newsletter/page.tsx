"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Mail,
  Calendar,
  FileText,
  Newspaper,
  Globe,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contentItems = [
  {
    id: 1,
    title: "Alumni Impact: Transforming Education in Developing Countries",
    type: "Article",
    date: "2023-07-15",
    author: "Dr. Emily Chen",
    preview:
      "Explore how our alumni are making a difference in global education...",
    content: "Full content of the article...",
  },
  {
    id: 2,
    title: "Q2 2023 Endowment Performance Report",
    type: "Report",
    date: "2023-07-01",
    author: "University Finance Office",
    preview:
      "A detailed analysis of our endowment's performance in the second quarter...",
    content: "Full content of the report...",
  },
  {
    id: 3,
    title: "New Research Breakthrough in Quantum Computing",
    type: "Press Release",
    date: "2023-06-28",
    author: "University PR Team",
    preview:
      "University researchers achieve a major milestone in quantum computing...",
    content: "Full content of the press release...",
  },
  {
    id: 4,
    title: "The Future of Work: Insights from Alumni in Tech",
    type: "Blog Post",
    date: "2023-06-20",
    author: "Sarah Johnson",
    preview:
      "Alumni leaders in the tech industry share their predictions for the future workplace...",
    content: "Full content of the blog post...",
  },
  {
    id: 5,
    title: "Annual Alumni Survey Results",
    type: "Report",
    date: "2023-06-15",
    author: "Alumni Relations Office",
    preview:
      "Key findings from our annual survey of alumni engagement and satisfaction...",
    content: "Full content of the survey results...",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [contentType, setContentType] = useState("all");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
    }, 10000); // Change featured content every 10 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscription data:", { email });
    toast({
      title: "Subscription Successful",
      description: "You've been subscribed to our newsletter!",
    });
    setEmail("");
  };

  const filteredContent =
    contentType === "all"
      ? contentItems
      : contentItems.filter((item) => item.type.toLowerCase() === contentType);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Alumni Insights & Updates
      </h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-2xl font-semibold mb-2">Stay Connected</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter for the latest updates
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full md:w-auto"
            >
              <Input
                className="mb-2 sm:mb-0 sm:mr-2"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest Content</CardTitle>
            <CardDescription>
              Stay informed with our latest articles, reports, and press
              releases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={(value) => setContentType(value)}
            >
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="article">Articles</TabsTrigger>
                <TabsTrigger value="report">Reports</TabsTrigger>
                <TabsTrigger value="press release">Press</TabsTrigger>
                <TabsTrigger value="blog post">Blog</TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={contentType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContentList items={filteredContent} />
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Content</CardTitle>
            <CardDescription>
              Highlights from our most impactful stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {contentItems[featuredIndex].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {contentItems[featuredIndex].author} |{" "}
                  {contentItems[featuredIndex].date}
                </p>
                <p className="mb-4">{contentItems[featuredIndex].preview}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Read Full Article</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>
                        {contentItems[featuredIndex].title}
                      </DialogTitle>
                      <DialogDescription>
                        {contentItems[featuredIndex].author} |{" "}
                        {contentItems[featuredIndex].date}
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh] mt-4">
                      <p>{contentItems[featuredIndex].content}</p>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Alumni Events</CardTitle>
          <CardDescription>
            Connect with fellow alumni at these exciting events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <EventCard
              title="Annual Alumni Gala"
              date="2023-09-15"
              location="Grand Ballroom, University Campus"
              description="Join us for an evening of celebration and networking with fellow alumni."
            />
            <EventCard
              title="Tech Innovators Panel"
              date="2023-10-05"
              location="Virtual Event"
              description="Hear from alumni leaders in the tech industry about the latest innovations and career opportunities."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContentList({ items }: { items: typeof contentItems }) {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-4 border-b last:border-b-0"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <Badge variant="outline">{item.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {item.author} | {item.date}
          </p>
          <p className="mt-2">{item.preview}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="mt-2 p-0">
                Read More
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{item.title}</DialogTitle>
                <DialogDescription>
                  {item.author} | {item.date}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] mt-4">
                <p>{item.content}</p>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </ScrollArea>
  );
}

function EventCard({
  title,
  date,
  location,
  description,
}: {
  title: string;
  date: string;
  location: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          <Calendar className="inline mr-2" />
          {new Date(date).toLocaleDateString()}
        </p>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

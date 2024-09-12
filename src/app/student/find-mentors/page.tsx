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

const mentors = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    expertise: ["Web Development", "Machine Learning"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Marketing Director",
    company: "Brand Co",
    expertise: ["Digital Marketing", "Brand Strategy"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Financial Analyst",
    company: "Finance Inc",
    expertise: ["Investment Banking", "Risk Management"],
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  // Add more mentors as needed
];

export default function MentorPanel() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Alumni Mentor Panel</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with experienced alumni who are ready to guide you in your
          career journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{mentor.name}</CardTitle>
                  <CardDescription>
                    {mentor.role} at {mentor.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={`/student/find-mentors/${mentor.id}`}
                className="w-full"
              >
                <Button className="w-full">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/student/find-mentors/request">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Request Mentorship
          </Button>
        </Link>
      </div>
    </div>
  );
}

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
import { Progress } from "@/components/ui/progress";
import { DollarSign, BookOpen, FlaskConical, Building2 } from "lucide-react";

const donationCards = [
  {
    title: "Scholarship Fund",
    description: "Support deserving students",
    icon: BookOpen,
    progress: 75,
    goal: 100000,
    raised: 75000,
    link: "/donations/form?fund=scholarship",
  },
  {
    title: "Research Fund",
    description: "Advance cutting-edge research",
    icon: FlaskConical,
    progress: 60,
    goal: 200000,
    raised: 120000,
    link: "/donations/form?fund=research",
  },
  {
    title: "Campus Improvement",
    description: "Enhance our facilities",
    icon: Building2,
    progress: 40,
    goal: 150000,
    raised: 60000,
    link: "/donations/form?fund=campus",
  },
];

export default function DonationsPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Your Alma Mater</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your generous donations help us continue to provide excellent
          education and opportunities for future generations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {donationCards.map((card, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <card.icon className="h-6 w-6 text-primary" />
                <CardTitle>{card.title}</CardTitle>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Progress value={card.progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                ${card.raised.toLocaleString()} raised of $
                {card.goal.toLocaleString()} goal
              </p>
            </CardContent>
            <CardFooter>
              <Link href={card.link} className="w-full">
                <Button className="w-full">Donate Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mb-12">
        <Link href="/donations/form">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Make a General Donation
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>John Doe donated $1,000 to the Scholarship Fund</span>
            </li>
            <li className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>Jane Smith donated $500 to the Research Fund</span>
            </li>
            <li className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span>Anonymous donated $250 to Campus Improvement</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

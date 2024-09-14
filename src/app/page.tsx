import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Gift,
  Globe,
  Search,
  ArrowRight,
  Briefcase,
  Award,
  Heart,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Alma University Alumni Portal
            </h1>
            <p className="text-xl mb-8">
              Connecting Graduates, Empowering Futures
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild>
                <Link href="/register">Join Alumni Network</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Alumni Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Alumni Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-6 w-6" />
                    Networking Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Connect with fellow alumni through events and our online
                    community.
                  </p>
                  <Link
                    href="/alumni/network"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Explore Network
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-6 w-6" />
                    Career Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Access job boards, career counseling, and professional
                    development resources.
                  </p>
                  <Link
                    href="/alumni/careers"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    View Opportunities
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-6 w-6" />
                    Lifelong Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Engage in continuous education with exclusive webinars and
                    courses.
                  </p>
                  <Link
                    href="/alumni/learning"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Discover Courses
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-6 w-6" />
                    Exclusive Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Enjoy special discounts and services available only to Alma
                    University alumni.
                  </p>
                  <Link
                    href="/alumni/perks"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    See Benefits
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-6 w-6" />
                    Mentorship Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Give back by mentoring current students or connect with a
                    mentor yourself.
                  </p>
                  <Link
                    href="/alumni/mentor"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Join Program
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-6 w-6" />
                    Give Back
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Support your alma mater through donations, volunteering, or
                    legacy programs.
                  </p>
                  <Link
                    href="/donations"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Alumni Spotlight */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Alumni Spotlight
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Alumni Success Story</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={`/placeholder.svg?text=Alumni+${i}`}
                      alt={`Alumni ${i}`}
                      className="rounded-full w-24 h-24 mx-auto mb-4"
                      width={96}
                      height={96}
                    />
                    <p className="text-center mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link
                      href={`/alumni/stories/${i}`}
                      className="text-primary hover:underline block text-center"
                    >
                      Read Full Story
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/success-stories">More Success Stories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Upcoming Alumni Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Annual Alumni Gala",
                  date: "June 15, 2023",
                  time: "7:00 PM",
                },
                {
                  title: "Homecoming Weekend",
                  date: "October 5-7, 2023",
                  time: "All Day",
                },
                {
                  title: "Career Networking Night",
                  date: "September 20, 2023",
                  time: "6:00 PM - 9:00 PM",
                },
              ].map((event, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      {event.date} at {event.time}
                    </p>
                    <Button variant="outline">RSVP</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/alumni/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* News and Updates */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Alumni News and Updates
            </h2>
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="updates">University Updates</TabsTrigger>
              </TabsList>
              <TabsContent value="news">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Alumni News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Alumni-funded scholarship program announced</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Class of 2013 plans 10-year reunion</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>
                          Alumna Sarah Johnson appointed CEO of Tech Giant
                        </span>
                      </li>
                    </ul>
                    <Link
                      href="/alumni/news"
                      className="text-primary hover:underline mt-4 inline-block"
                    >
                      Read More News
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>University Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>New research center opens on campus</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>Alma University ranks in top 50 globally</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                        <span>President announces new strategic plan</span>
                      </li>
                    </ul>
                    <Link
                      href="/university/news"
                      className="text-primary hover:underline mt-4 inline-block"
                    >
                      View All Updates
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get Involved</h2>
            <p className="text-xl mb-8">
              There are many ways to stay connected and support Alma University
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer</CardTitle>
                </CardHeader>
                <CardContent>
                  Give back by volunteering your time and expertise to support
                  university initiatives.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Donate</CardTitle>
                </CardHeader>
                <CardContent>
                  Support scholarships, research, and campus improvements
                  through your generous donations.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  Share your experience and guide current students as they
                  prepare for their careers.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recruit</CardTitle>
                </CardHeader>
                <CardContent>
                  Help fellow alumni and students by sharing job opportunities
                  at your organization.
                </CardContent>
              </Card>
            </div>
            <Button size="lg" className="mt-12" asChild>
              <Link href="/alumni/get-involved">Explore Opportunities</Link>
            </Button>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Stay Connected</h2>
            <p className="text-xl mb-8">
              Subscribe to our alumni newsletter for the latest updates, events,
              and opportunities
            </p>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

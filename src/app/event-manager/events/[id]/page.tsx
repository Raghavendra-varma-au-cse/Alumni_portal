"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Users, DollarSign, Globe, Edit } from "lucide-react";

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [event] = useState({
    id: 1,
    name: "Alumni Networking Night",
    date: "2023-07-15",
    time: "19:00",
    location: "Grand Hall",
    description:
      "Join us for an evening of networking with fellow alumni. This event provides an excellent opportunity to connect with professionals from various industries, share experiences, and potentially discover new career opportunities.",
    capacity: 150,
    registeredAttendees: 120,
    ticketPrice: 25,
    totalRevenue: 3000,
    isOnline: false,
    status: "Upcoming",
    organizer: "Alumni Association",
    sponsors: ["TechCorp", "Global Industries"],
  });

  const [attendees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      graduationYear: 2015,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      graduationYear: 2018,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      graduationYear: 2010,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{event.name}</h1>
        <Link href={`/event-manager/events/${event.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Event
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Key information about the event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.date} at {event.time}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.registeredAttendees} / {event.capacity} attendees
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${event.ticketPrice} per ticket</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{event.isOnline ? "Online Event" : "In-person Event"}</span>
            </div>
            <div>
              <Badge
                variant={
                  event.status === "Upcoming"
                    ? "default"
                    : event.status === "Open for Registration"
                      ? "secondary"
                      : event.status === "Ongoing"
                        ? "destructive"
                        : "outline"
                }
              >
                {event.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
            <CardDescription>Key metrics for the event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Revenue:</span>
              <span>${event.totalRevenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tickets Sold:</span>
              <span>{event.registeredAttendees}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Remaining Capacity:</span>
              <span>{event.capacity - event.registeredAttendees}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Organizer:</span>
              <span>{event.organizer}</span>
            </div>
            <div>
              <span className="font-medium">Sponsors:</span>
              <ul className="list-disc list-inside">
                {event.sponsors.map((sponsor, index) => (
                  <li key={index}>{sponsor}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Attendees</CardTitle>
          <CardDescription>
            List of alumni registered for the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Graduation Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.graduationYear}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

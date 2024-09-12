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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Annual Alumni Gala",
    date: "2023-12-15",
    time: "19:00",
    location: "Grand Hotel Ballroom",
    type: "In-person",
  },
  {
    id: 2,
    title: "Tech Industry Networking",
    date: "2023-11-05",
    time: "18:30",
    location: "Virtual",
    type: "Online",
  },
  {
    id: 3,
    title: "Class of 2013 Reunion",
    date: "2023-10-20",
    time: "14:00",
    location: "University Campus",
    type: "In-person",
  },
  {
    id: 4,
    title: "Career Development Workshop",
    date: "2023-11-15",
    time: "10:00",
    location: "Virtual",
    type: "Online",
  },
  {
    id: 5,
    title: "Homecoming Weekend",
    date: "2023-09-30",
    time: "All Day",
    location: "University Campus",
    type: "In-person",
  },
  {
    id: 6,
    title: "Alumni Speaker Series",
    date: "2023-12-01",
    time: "19:30",
    location: "University Auditorium",
    type: "In-person",
  },
];

export default function EventsAndReunions() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    setIsRegistering(true);
    // Here you would typically send the registration data to your backend
    console.log(
      "Registered for event:",
      selectedEvent.id,
      Object.fromEntries(new FormData(event.target)),
    );
    setTimeout(() => {
      setIsRegistering(false);
      setSelectedEvent(null);
      // Handle successful registration (e.g., show success message, close dialog)
    }, 2000);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Events and Reunions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.type} Event</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-center mb-2">
                <CalendarIcon className="mr-2 h-4 w-4" /> {event.date}
              </p>
              <p className="flex items-center mb-2">
                <ClockIcon className="mr-2 h-4 w-4" /> {event.time}
              </p>
              <p className="flex items-center">
                <MapPinIcon className="mr-2 h-4 w-4" /> {event.location}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedEvent(event)}>
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Register for {selectedEvent?.title}
                    </DialogTitle>
                    <DialogDescription>
                      Fill out the form below to register for this event.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="graduationYear" className="text-right">
                          Grad Year
                        </Label>
                        <Input
                          id="graduationYear"
                          name="graduationYear"
                          type="number"
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isRegistering}>
                        {isRegistering ? "Registering..." : "Register"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function EventForm({ params }: { params: { action: string } }) {
  const router = useRouter();
  const isEditing = params.action === "edit";

  const [event, setEvent] = useState({
    name: "",
    date: new Date(),
    location: "",
    description: "",
    capacity: 0,
    ticketPrice: 0,
    isOnline: false,
    status: "Planning",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEvent((prev) => ({ ...prev, date }));
  };

  const handleSwitchChange = () => {
    setEvent((prev) => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving event:", event);
    router.push("/event-manager/events");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        {isEditing ? "Edit" : "Create"} Event
      </h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              {isEditing
                ? "Edit the details of your event"
                : "Enter the details for your new event"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Event Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={event.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="date">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !event.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {event.date ? (
                      format(event.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={event.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={event.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={event.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                type="number"
                id="capacity"
                name="capacity"
                value={event.capacity}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="ticketPrice">Ticket Price ($)</Label>
              <Input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                value={event.ticketPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isOnline"
                checked={event.isOnline}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isOnline">Online Event</Label>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={event.status}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "status", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Open for Registration">
                    Open for Registration
                  </SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/event-manager/events")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Event</Button>
        </div>
      </form>
    </div>
  );
}

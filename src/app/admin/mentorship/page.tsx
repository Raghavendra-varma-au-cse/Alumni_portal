"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Edit, Trash2 } from "lucide-react";

export default function MentorshipPage() {
  const [mentorships, setMentorships] = useState([
    {
      id: 1,
      mentor: "John Doe",
      mentee: "Alice Brown",
      startDate: "2023-01-15",
      endDate: "",
      status: "Active",
      field: "Software Engineering",
    },
    {
      id: 2,
      mentor: "Jane Smith",
      mentee: "Bob Johnson",
      startDate: "2023-02-01",
      endDate: "",
      status: "Active",
      field: "Marketing",
    },
    {
      id: 3,
      mentor: "Mike Wilson",
      mentee: "Carol Davis",
      startDate: "2023-03-10",
      endDate: "2023-06-10",
      status: "Completed",
      field: "Finance",
    },
    {
      id: 4,
      mentor: "Sarah Lee",
      mentee: "David Clark",
      startDate: "2023-04-05",
      endDate: "",
      status: "Pending",
      field: "Data Science",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredMentorships = mentorships.filter(
    (mentorship) =>
      (mentorship.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentorship.mentee.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || mentorship.status === filterStatus),
  );

  const handleDeleteMentorship = (id) => {
    setMentorships(mentorships.filter((m) => m.id !== id));
  };

  const fields = [...new Set(mentorships.map((m) => m.field))];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Mentorship Program Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Mentorship Statistics</CardTitle>
          <CardDescription>
            Overview of mentorship program metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Mentorships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mentorships.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Mentorships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mentorships.filter((m) => m.status === "Active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Mentorships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mentorships.filter((m) => m.status === "Completed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Mentorships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mentorships.filter((m) => m.status === "Pending").length}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mentorship Pairs</CardTitle>
          <CardDescription>
            Manage and track mentorship relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentorships"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Create Mentorship Pair
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Mentorship Pair</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new mentorship relationship.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mentor" className="text-right">
                      Mentor
                    </Label>
                    <Input id="mentor" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mentee" className="text-right">
                      Mentee
                    </Label>
                    <Input id="mentee" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="field" className="text-right">
                      Field
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input id="startDate" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Mentorship</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Mentee</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentorships.map((mentorship) => (
                  <TableRow key={mentorship.id}>
                    <TableCell className="font-medium">
                      {mentorship.mentor}
                    </TableCell>
                    <TableCell>{mentorship.mentee}</TableCell>
                    <TableCell>{mentorship.field}</TableCell>
                    <TableCell>{mentorship.startDate}</TableCell>
                    <TableCell>{mentorship.endDate || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          mentorship.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {mentorship.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMentorship(mentorship.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

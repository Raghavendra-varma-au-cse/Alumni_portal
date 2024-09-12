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
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, Trash2, Eye } from "lucide-react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      recipient: "Admin",
      subject: "Alumni Event Question",
      date: "2023-06-15",
      status: "Unread",
    },
    {
      id: 2,
      sender: "Admin",
      recipient: "Jane Smith",
      subject: "Re: Donation Inquiry",
      date: "2023-06-14",
      status: "Sent",
    },
    {
      id: 3,
      sender: "Bob Johnson",
      recipient: "Admin",
      subject: "Mentorship Program",
      date: "2023-06-13",
      status: "Read",
    },
    {
      id: 4,
      sender: "Alice Brown",
      recipient: "Admin",
      subject: "Job Board Posting",
      date: "2023-06-12",
      status: "Unread",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const filteredMessages = messages.filter(
    (message) =>
      (message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || message.status === filterStatus),
  );

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    setReplyContent("");
  };

  const handleReplyMessage = () => {
    // Logic to send reply
    console.log(`Replying to message ${selectedMessage.id}: ${replyContent}`);
    setIsViewDialogOpen(false);
  };

  const statuses = [...new Set(messages.map((message) => message.status))];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Message Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Message Statistics</CardTitle>
          <CardDescription>Overview of message metrics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unread Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  messages.filter((message) => message.status === "Unread")
                    .length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {messages.filter((message) => message.status === "Sent").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Read Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {messages.filter((message) => message.status === "Read").length}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Inbox</CardTitle>
          <CardDescription>Manage and respond to messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages"
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
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">
                      {message.sender}
                    </TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{message.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          message.status === "Unread"
                            ? "default"
                            : message.status === "Read"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {message.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>View and reply to the message</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-sender" className="text-right">
                  Sender
                </Label>
                <div id="view-sender" className="col-span-3">
                  {selectedMessage.sender}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-recipient" className="text-right">
                  Recipient
                </Label>
                <div id="view-recipient" className="col-span-3">
                  {selectedMessage.recipient}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-subject" className="text-right">
                  Subject
                </Label>
                <div id="view-subject" className="col-span-3">
                  {selectedMessage.subject}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-date" className="text-right">
                  Date
                </Label>
                <div id="view-date" className="col-span-3">
                  {selectedMessage.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-status" className="text-right">
                  Status
                </Label>
                <div id="view-status" className="col-span-3">
                  <Badge
                    variant={
                      selectedMessage.status === "Unread"
                        ? "default"
                        : selectedMessage.status === "Read"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedMessage.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-content" className="text-right">
                  Content
                </Label>
                <div id="view-content" className="col-span-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reply-content" className="text-right">
                  Reply
                </Label>
                <Textarea
                  id="reply-content"
                  className="col-span-3"
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setIsViewDialogOpen(false)}
              variant="outline"
            >
              Close
            </Button>
            <Button
              onClick={handleReplyMessage}
              disabled={!replyContent.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

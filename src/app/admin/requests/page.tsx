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
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Account Verification",
      user: "John Doe",
      date: "2023-05-15",
      status: "Pending",
      content:
        "I would like to verify my alumni account. I graduated in 2015 with a degree in Computer Science.",
    },
    {
      id: 2,
      type: "Event Proposal",
      user: "Jane Smith",
      date: "2023-05-14",
      status: "Approved",
      content:
        "Proposing a networking event for recent graduates in the tech industry. The event would be held virtually and feature guest speakers from leading tech companies.",
    },
    {
      id: 3,
      type: "Resource Submission",
      user: "Bob Johnson",
      date: "2023-05-13",
      status: "Rejected",
      content:
        'I have created a comprehensive guide on "Transitioning from Academia to Industry" and would like to submit it as a resource for other alumni.',
    },
    {
      id: 4,
      type: "Mentorship Application",
      user: "Alice Brown",
      date: "2023-05-12",
      status: "Pending",
      content:
        "I am interested in becoming a mentor for current students in the Business School. I have 10 years of experience in marketing and would love to give back to the community.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");

  const filteredRequests = requests.filter(
    (request) =>
      (request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || request.type === filterType),
  );

  const handleApproveRequest = (id) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "Approved" } : r)),
    );
    setIsViewDialogOpen(false);
  };

  const handleRejectRequest = (id) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)),
    );
    setIsViewDialogOpen(false);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
    setAdminResponse("");
  };

  const requestTypes = [...new Set(requests.map((r) => r.type))];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Request Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Request Statistics</CardTitle>
          <CardDescription>Overview of request metrics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rejected Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Rejected").length}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Queue</CardTitle>
          <CardDescription>
            Manage and process incoming requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {requestTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.type}
                    </TableCell>
                    <TableCell>{request.user}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === "Approved"
                            ? "default"
                            : request.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "Pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
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
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Review the full content of the request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="request-type" className="text-right">
                  Type
                </Label>
                <div id="request-type" className="col-span-3">
                  {selectedRequest.type}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="request-user" className="text-right">
                  User
                </Label>
                <div id="request-user" className="col-span-3">
                  {selectedRequest.user}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="request-date" className="text-right">
                  Date
                </Label>
                <div id="request-date" className="col-span-3">
                  {selectedRequest.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="request-status" className="text-right">
                  Status
                </Label>
                <div id="request-status" className="col-span-3">
                  <Badge
                    variant={
                      selectedRequest.status === "Approved"
                        ? "default"
                        : selectedRequest.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="request-content" className="text-right">
                  Content
                </Label>
                <div id="request-content" className="col-span-3">
                  {selectedRequest.content}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="admin-response" className="text-right">
                  Admin Response
                </Label>
                <Textarea
                  id="admin-response"
                  className="col-span-3"
                  placeholder="Enter your response..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedRequest && selectedRequest.status === "Pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleRejectRequest(selectedRequest.id)}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleApproveRequest(selectedRequest.id)}
                >
                  Approve
                </Button>
              </>
            )}
            {selectedRequest && selectedRequest.status !== "Pending" && (
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  FileText,
  Video,
  Link as LinkIcon,
} from "lucide-react";

export default function ResourcesManagement() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Career Development Guide",
      type: "PDF",
      category: "Career",
      date: "2023-05-01",
      status: "Published",
    },
    {
      id: 2,
      title: "Alumni Networking Webinar",
      type: "Video",
      category: "Networking",
      date: "2023-05-15",
      status: "Draft",
    },
    {
      id: 3,
      title: "Graduate School Application Tips",
      type: "Article",
      category: "Education",
      date: "2023-06-01",
      status: "Published",
    },
    {
      id: 4,
      title: "Industry Insights: Tech Sector",
      type: "Podcast",
      category: "Industry",
      date: "2023-06-10",
      status: "Pending Review",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredResources = resources.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || item.category === filterCategory),
  );

  const handleDeleteResource = (id) => {
    setResources(resources.filter((item) => item.id !== id));
  };

  const handleViewResource = (item) => {
    setSelectedResource(item);
    setIsViewDialogOpen(true);
  };

  const categories = [...new Set(resources.map((item) => item.category))];

  const getResourceIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Article":
        return <FileText className="h-4 w-4" />;
      case "Podcast":
        return <Video className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Resources Management</h1>
        <Button asChild>
          <Link href="/content-manager/resources/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Resource
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>
            Manage educational and career resources for alumni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getResourceIcon(item.type)}
                        <span className="ml-2">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "Published"
                            ? "default"
                            : item.status === "Draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewResource(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        asChild
                      >
                        <Link
                          href={`/content-manager/resources/edit/${item.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteResource(item.id)}
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
            <DialogTitle>Resource Details</DialogTitle>
            <DialogDescription>
              View the full details of the resource
            </DialogDescription>
          </DialogHeader>
          {selectedResource && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <div id="title" className="col-span-3">
                  {selectedResource.title}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <div id="type" className="col-span-3 flex items-center">
                  {getResourceIcon(selectedResource.type)}
                  <span className="ml-2">{selectedResource.type}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div id="category" className="col-span-3">
                  {selectedResource.category}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div id="date" className="col-span-3">
                  {selectedResource.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div id="status" className="col-span-3">
                  <Badge
                    variant={
                      selectedResource.status === "Published"
                        ? "default"
                        : selectedResource.status === "Draft"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedResource.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <div id="description" className="col-span-3">
                  This is a placeholder description for the resource. In a real
                  application, this would contain detailed information about the
                  resource, including its content, target audience, and any
                  other relevant details.
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

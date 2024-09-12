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
import { Search, PlusCircle, Edit, Trash2, Eye } from "lucide-react";

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "Alumni Reunion 2023",
      category: "Events",
      date: "2023-06-15",
      status: "Published",
      views: 1250,
    },
    {
      id: 2,
      title: "New Scholarship Program Launched",
      category: "Announcements",
      date: "2023-06-10",
      status: "Draft",
      views: 0,
    },
    {
      id: 3,
      title: "Campus Expansion Project Update",
      category: "Updates",
      date: "2023-06-05",
      status: "Published",
      views: 875,
    },
    {
      id: 4,
      title: "Alumni Spotlight: Sarah Johnson",
      category: "Features",
      date: "2023-06-01",
      status: "Published",
      views: 2100,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredNews = newsItems.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || news.category === filterCategory),
  );

  const handleDeleteNews = (id) => {
    setNewsItems(newsItems.filter((news) => news.id !== id));
  };

  const handleViewNews = (news) => {
    setSelectedNews(news);
    setIsViewDialogOpen(true);
  };

  const categories = [...new Set(newsItems.map((news) => news.category))];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">News Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>News Statistics</CardTitle>
          <CardDescription>Overview of news metrics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total News Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsItems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Published Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {newsItems.filter((news) => news.status === "Published").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {newsItems.filter((news) => news.status === "Draft").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {newsItems.reduce((sum, news) => sum + news.views, 0)}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>News Items</CardTitle>
          <CardDescription>Manage and publish news for alumni</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news"
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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add News Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add News Item</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new news item.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Content
                    </Label>
                    <Textarea id="content" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add News Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell className="font-medium">{news.title}</TableCell>
                    <TableCell>{news.category}</TableCell>
                    <TableCell>{news.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          news.status === "Published" ? "default" : "secondary"
                        }
                      >
                        {news.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{news.views}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewNews(news)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNews(news.id)}
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
            <DialogTitle>News Item Details</DialogTitle>
            <DialogDescription>
              View the full content of the news item
            </DialogDescription>
          </DialogHeader>
          {selectedNews && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-title" className="text-right">
                  Title
                </Label>
                <div id="view-title" className="col-span-3">
                  {selectedNews.title}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-category" className="text-right">
                  Category
                </Label>
                <div id="view-category" className="col-span-3">
                  {selectedNews.category}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-date" className="text-right">
                  Date
                </Label>
                <div id="view-date" className="col-span-3">
                  {selectedNews.date}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-status" className="text-right">
                  Status
                </Label>
                <div id="view-status" className="col-span-3">
                  <Badge
                    variant={
                      selectedNews.status === "Published"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedNews.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view-views" className="text-right">
                  Views
                </Label>
                <div id="view-views" className="col-span-3">
                  {selectedNews.views}
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

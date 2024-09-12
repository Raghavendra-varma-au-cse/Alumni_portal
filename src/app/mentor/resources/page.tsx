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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileIcon, Link2Icon, Trash2Icon } from "lucide-react";

export default function ResourceSharing() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Introduction to React",
      type: "link",
      url: "https://reactjs.org/",
      description: "Official React documentation",
    },
    {
      id: 2,
      title: "JavaScript: The Good Parts",
      type: "file",
      url: "/path/to/file.pdf",
      description: "Book on JavaScript best practices",
    },
  ]);
  const [newResource, setNewResource] = useState({
    title: "",
    type: "link",
    url: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  const addResource = (e) => {
    e.preventDefault();
    setResources([...resources, { id: Date.now(), ...newResource }]);
    setNewResource({ title: "", type: "link", url: "", description: "" });
  };

  const deleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Resource Sharing</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Resource</CardTitle>
          <CardDescription>
            Share helpful links or files with your mentees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addResource} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newResource.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={newResource.type}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="link">Link</option>
                  <option value="file">File</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL or File Path</Label>
              <Input
                id="url"
                name="url"
                value={newResource.url}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newResource.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <Button type="submit">Add Resource</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {resource.type === "link" ? (
                    <Link2Icon className="h-5 w-5" />
                  ) : (
                    <FileIcon className="h-5 w-5" />
                  )}
                  <CardTitle>{resource.title}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteResource(resource.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>{resource.description}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {resource.type === "link" ? "Visit Link" : "Download File"}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

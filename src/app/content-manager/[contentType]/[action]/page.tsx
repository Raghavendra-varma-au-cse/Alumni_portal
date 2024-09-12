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

export default function ContentForm({
  params,
}: {
  params: { contentType: string; action: string };
}) {
  const router = useRouter();
  const { contentType, action } = params;
  const isEditing = action === "edit";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // Add more fields as needed for each content type
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    // Here you would typically send the data to your backend
    router.push(`/content-manager/${contentType}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        {isEditing ? "Edit" : "Create"} {contentType.slice(0, -1)}
      </h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit" : "Create"} {contentType.slice(0, -1)}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Edit the details of your content"
                : "Enter the details for your new content"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Add more fields as needed for each content type */}
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/content-manager/${contentType}`)}
          >
            Cancel
          </Button>
          <Button type="submit">{isEditing ? "Save Changes" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}

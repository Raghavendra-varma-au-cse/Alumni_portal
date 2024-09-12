import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, Headphones } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Alumni Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              Career Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Access comprehensive guides on various career paths and
              industries.
            </p>
            <Button>View Guides</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2" />
              Webinar Recordings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Watch recordings of our past webinars on professional development
              topics.
            </p>
            <Button>Access Webinars</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Headphones className="mr-2" />
              Alumni Podcasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Listen to inspiring stories and insights from successful alumni.
            </p>
            <Button>Listen Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <AlertCircle className="h-6 w-6" />
            <span>404 - Page Not Found</span>
          </CardTitle>
          <CardDescription>
            Oops! It seems you've wandered off the campus map.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">404</p>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div
            className="bg-muted border-l-4 border-primary p-4 rounded-r-md"
            role="alert"
          >
            <p className="font-bold text-foreground">Lost? Don't worry!</p>
            <p className="text-muted-foreground">
              You can use the buttons below to find your way back.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search Alumni Portal
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

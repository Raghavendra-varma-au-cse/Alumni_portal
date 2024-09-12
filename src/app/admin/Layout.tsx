import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Users,
  Calendar,
  Briefcase,
  Heart,
  FileText,
  Settings,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Globe,
  Bell,
  Menu,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100">
            <BarChart className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/admin/pages"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <FileText className="inline-block w-5 h-5 mr-2" />
            Pages
          </Link>
          <Link
            href="/admin/events"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Calendar className="inline-block w-5 h-5 mr-2" />
            Events
          </Link>
          <Link
            href="/admin/donations"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Heart className="inline-block w-5 h-5 mr-2" />
            Donations
          </Link>
          <Link
            href="/admin/jobs"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Briefcase className="inline-block w-5 h-5 mr-2" />
            Jobs
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Users
          </Link>
          <Link
            href="/admin/mentorship"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <GraduationCap className="inline-block w-5 h-5 mr-2" />
            Mentorship
          </Link>
          <Link
            href="/admin/resources"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <BookOpen className="inline-block w-5 h-5 mr-2" />
            Resources
          </Link>
          <Link
            href="/admin/news"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Globe className="inline-block w-5 h-5 mr-2" />
            News
          </Link>
          <Link
            href="/admin/messages"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <MessageSquare className="inline-block w-5 h-5 mr-2" />
            Messages
          </Link>
          <Link
            href="/admin/requests"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Bell className="inline-block w-5 h-5 mr-2" />
            Requests
          </Link>
          <Link
            href="/admin/analytics"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <BarChart className="inline-block w-5 h-5 mr-2" />
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            <Settings className="inline-block w-5 h-5 mr-2" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calendar } from '@/components/ui/calendar'
import { BarChart2, CalendarIcon, DollarSign, Settings, Users } from 'lucide-react'
import { BarChart, LineChart, PieChart } from 'recharts'
import { DataTable } from '@/components/ui/data-table'


export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const userStats = [
    { title: 'Total Users', value: '10,483', icon: Users, change: '+12%' },
    { title: 'New Registrations', value: '2,345', icon: Users, change: '+5%' },
    { title: 'Active Users', value: '8,765', icon: Users, change: '+8%' },
    { title: 'User Engagement', value: '76%', icon: BarChart2, change: '+3%' },
  ]

  const recentActivity = [
    { user: 'John Doe', action: 'Updated profile', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Registered for event', time: '4 hours ago' },
    { user: 'Bob Johnson', action: 'Posted a job', time: '6 hours ago' },
    { user: 'Alice Brown', action: 'Made a donation', time: '8 hours ago' },
  ]

  return (
    <div className="container mx-auto py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { name: 'Jan', value: 2000 },
                { name: 'Feb', value: 2500 },
                { name: 'Mar', value: 3000 },
                { name: 'Apr', value: 3500 },
                { name: 'May', value: 4000 },
                { name: 'Jun', value: 4500 },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={[
                { name: 'Donations', value: 50000 },
                { name: 'Event Tickets', value: 30000 },
                { name: 'Memberships', value: 20000 },
                { name: 'Merchandise', value: 10000 },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { accessorKey: 'user', header: 'User' },
                { accessorKey: 'action', header: 'Action' },
                { accessorKey: 'time', header: 'Time' },
              ]}
              data={recentActivity}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                { name: 'Alumni', value: 60 },
                { name: 'Students', value: 25 },
                { name: 'Faculty', value: 10 },
                { name: 'Others', value: 5 },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Create Event
            </Button>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              View Donations
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
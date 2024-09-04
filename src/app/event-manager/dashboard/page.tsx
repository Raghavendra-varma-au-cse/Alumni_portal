"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Users, DollarSign, MapPin } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

type Event = {
  id: string
  title: string
  date: string
  location: string
  attendees: number
  status: string
}

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "attendees",
    header: "Attendees",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

const data: Event[] = [
  {
    id: "1",
    title: "Annual Alumni Gala",
    date: "2023-09-15",
    location: "Grand Ballroom",
    attendees: 250,
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Career Fair",
    date: "2023-10-05",
    location: "University Campus",
    attendees: 500,
    status: "Planning",
  },
  // Add more mock data here
]

export default function EventManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Event Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,567</div>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">+20% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Venues</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 new venues added</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <DataTable columns={columns} data={data.filter(event => event.status === 'Upcoming')} />
            </TabsContent>
            <TabsContent value="past">
              <DataTable columns={columns} data={data.filter(event => event.status === 'Past')} />
            </TabsContent>
            <TabsContent value="planning">
              <DataTable columns={columns} data={data.filter(event => event.status === 'Planning')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
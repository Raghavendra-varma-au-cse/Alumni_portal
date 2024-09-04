"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Image, Video, AlertCircle } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

type Content = {
  id: string
  title: string
  type: string
  status: string
  author: string
  createdAt: string
}

const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
]

const data: Content[] = [
  {
    id: "1",
    title: "Alumni Success Story: John Doe",
    type: "Article",
    status: "Published",
    author: "Jane Smith",
    createdAt: "2023-06-01",
  },
  {
    id: "2",
    title: "Campus Tour Video",
    type: "Video",
    status: "Draft",
    author: "Mike Johnson",
    createdAt: "2023-06-02",
  },
  // Add more mock data here
]

export default function ContentManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Content Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">79% of total content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">18% of total content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">3% of total content</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <DataTable columns={columns} data={data} />
            </TabsContent>
            <TabsContent value="articles">
              <DataTable columns={columns} data={data.filter(item => item.type === 'Article')} />
            </TabsContent>
            <TabsContent value="videos">
              <DataTable columns={columns} data={data.filter(item => item.type === 'Video')} />
            </TabsContent>
            <TabsContent value="events">
              <DataTable columns={columns} data={data.filter(item => item.type === 'Event')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
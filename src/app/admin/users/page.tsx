"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter } from 'lucide-react'
import { PieChart } from 'recharts'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Alumni', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Faculty', status: 'Inactive' },
  // Add more user data here
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === '' || user.role === roleFilter) &&
    (statusFilter === '' || user.status === statusFilter)
  )

  return (
    <div className="container mx-auto py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        User Management
      </motion.h1>

      <Tabs defaultValue="all-users" className="mb-8">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all-users">
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Roles</SelectItem>
                    <SelectItem value="Alumni">Alumni</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alumni">Alumni</SelectItem>
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Faculty">Faculty</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button>Add User</Button>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable
                columns={[
                  { accessorKey: 'name', header: 'Name' },
                  { accessorKey: 'email', header: 'Email' },
                  { accessorKey: 'role', header: 'Role' },
                  { accessorKey: 'status', header: 'Status' },
                  {
                    id: 'actions',
                    cell: ({ row }) => (
                      <Button variant="ghost">Edit</Button>
                    ),
                  },
                ]}
                data={filteredUsers}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Role</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: 'Alumni', value: 60 },
                    { name: 'Students', value: 25 },
                    { name: 'Faculty', value: 15 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Status</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: 'Active', value: 80 },
                    { name: 'Inactive', value: 20 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
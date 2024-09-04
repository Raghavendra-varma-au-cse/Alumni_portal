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
import { Plus, Search, Filter, DollarSign } from 'lucide-react'
import { LineChart, PieChart } from 'recharts'

const donations = [
  { id: 1, donor: 'John Doe', amount: 1000, date: '2023-06-01', campaign: 'Scholarship Fund', status: 'Completed' },
  { id: 2, donor: 'Jane Smith', amount: 5000, date: '2023-06-15', campaign: 'Building Fund', status: 'Completed' },
  { id: 3, donor: 'Bob Johnson', amount: 2500, date: '2023-06-30', campaign: 'Research Grant', status: 'Pending' },
  // Add more donation data here
]

export default function DonationManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredDonations = donations.filter(donation =>
    donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (campaignFilter === '' || donation.campaign === campaignFilter) &&
    (statusFilter === '' || donation.status === statusFilter)
  )

  return (
    <div className="container mx-auto py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Donation Management
      </motion.h1>

      <Tabs defaultValue="all-donations" className="mb-8">
        <TabsList>
          <TabsTrigger value="all-donations">All Donations</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Donation Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all-donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search donors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Campaigns</SelectItem>
                    <SelectItem value="Scholarship Fund">Scholarship Fund</SelectItem>
                    <SelectItem value="Building Fund">Building Fund</SelectItem>
                    <SelectItem value="Research Grant">Research Grant</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Donation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Donation</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="donor-name" className="text-right">
                          Donor Name
                        </Label>
                        <Input id="donor-name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Amount
                        </Label>
                        <Input id="amount" type="number" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="campaign" className="text-right">
                          Campaign
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select campaign" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scholarship Fund">Scholarship Fund</SelectItem>
                            <SelectItem value="Building Fund">Building Fund</SelectItem>
                            <SelectItem value="Research Grant">Research Grant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button>Add Donation</Button>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable
                columns={[
                  { accessorKey: 'donor', header: 'Donor' },
                  { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => `${row.getValue('amount')}` },
                  { accessorKey: 'date', header: 'Date' },
                  { accessorKey: 'campaign', header: 'Campaign' },
                  { accessorKey: 'status', header: 'Status' },
                  {
                    id: 'actions',
                    cell: ({ row }) => (
                      <Button variant="ghost">Edit</Button>
                    ),
                  },
                ]}
                data={filteredDonations}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { accessorKey: 'name', header: 'Campaign Name' },
                  { accessorKey: 'goal', header: 'Goal', cell: ({ row }) => `${row.getValue('goal')}` },
                  { accessorKey: 'raised', header: 'Raised', cell: ({ row }) => `${row.getValue('raised')}` },
                  { accessorKey: 'progress', header: 'Progress', cell: ({ row }) => `${row.getValue('progress')}%` },
                  { accessorKey: 'status', header: 'Status' },
                  {
                    id: 'actions',
                    cell: ({ row }) => (
                      <Button variant="ghost">Manage</Button>
                    ),
                  },
                ]}
                data={[
                  { name: 'Scholarship Fund', goal: 100000, raised: 75000, progress: 75, status: 'Active' },
                  { name: 'Building Fund', goal: 500000, raised: 250000, progress: 50, status: 'Active' },
                  { name: 'Research Grant', goal: 200000, raised: 100000, progress: 50, status: 'Active' },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: 'Jan', value: 10000 },
                    { name: 'Feb', value: 15000 },
                    { name: 'Mar', value: 20000 },
                    { name: 'Apr', value: 25000 },
                    { name: 'May', value: 30000 },
                    { name: 'Jun', value: 35000 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Donation Distribution by Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: 'Scholarship Fund', value: 75000 },
                    { name: 'Building Fund', value: 250000 },
                    { name: 'Research Grant', value: 100000 },
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
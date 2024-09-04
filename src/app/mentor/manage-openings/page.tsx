"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { Briefcase, PlusCircle } from 'lucide-react'

export default function ManageOpenings() {
  const [openings, setOpenings] = useState([
    { id: 1, type: 'internship', title: 'Summer Intern - Software Development', status: 'pending', submittedDate: '2023-07-01' },
    { id: 2, type: 'job', title: 'Junior Data Analyst', status: 'approved', submittedDate: '2023-06-15' },
    { id: 3, type: 'internship', title: 'Marketing Intern', status: 'rejected', submittedDate: '2023-06-10' },
  ])

  const [newOpening, setNewOpening] = useState({
    type: 'internship',
    title: '',
    description: '',
    requirements: '',
    deadline: ''
  })

  const handleNewOpeningChange = (field, value) => {
    setNewOpening(prev => ({ ...prev, [field]: value }))
  }

  const submitNewOpening = () => {
    // Here you would typically send this data to your backend
    const newId = openings.length + 1
    const newOpeningWithId = {
      ...newOpening,
      id: newId,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0]
    }
    setOpenings([...openings, newOpeningWithId])
    toast({
      title: "Request Submitted",
      description: `Your ${newOpening.type} opening request has been sent to the admin for approval.`,
    })
    // Reset the form
    setNewOpening({
      type: 'internship',
      title: '',
      description: '',
      requirements: '',
      deadline: ''
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Manage Openings</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Opening Requests</CardTitle>
          <CardDescription>View and manage your internship and job opening requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openings.map((opening) => (
                <TableRow key={opening.id}>
                  <TableCell>{opening.type}</TableCell>
                  <TableCell>{opening.title}</TableCell>
                  <TableCell>
                    <Badge variant={opening.status === 'approved' ? 'success' : opening.status === 'rejected' ? 'destructive' : 'default'}>
                      {opening.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{opening.submittedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request New Opening
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request New Opening</DialogTitle>
                <DialogDescription>
                  Submit a request for a new internship or job opening in your company.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="opening-type" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={newOpening.type}
                    onValueChange={(value) => handleNewOpeningChange('type', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select opening type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="job">Job</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newOpening.title}
                    onChange={(e) => handleNewOpeningChange('title', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newOpening.description}
                    onChange={(e) => handleNewOpeningChange('description', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requirements" className="text-right">
                    Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={newOpening.requirements}
                    onChange={(e) => handleNewOpeningChange('requirements', e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newOpening.deadline}
                    onChange={(e) => handleNewOpeningChange('deadline', e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={submitNewOpening}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
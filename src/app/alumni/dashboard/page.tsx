"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Briefcase, Users, BookOpen, MessageSquare, PlusCircle, GraduationCap, TrendingUp, DollarSign, Bell, FileText, Award } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

export default function AlumniDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Alumni Networking Night", date: "2023-07-20", time: "19:00" },
    { id: 2, title: "Career Fair", date: "2023-07-25", time: "10:00" },
    { id: 3, title: "Mentorship Program Kickoff", date: "2023-07-30", time: "14:00" },
  ])

  const [jobPostings, setJobPostings] = useState([
    { id: 1, title: "Software Engineer", company: "Tech Corp", location: "San Francisco, CA" },
    { id: 2, title: "Data Analyst", company: "Data Insights Inc.", location: "New York, NY" },
    { id: 3, title: "Product Manager", company: "Innovate Co.", location: "Remote" },
  ])

  const [newEventRequest, setNewEventRequest] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    expectedAttendees: ''
  })

  const [newJobPostRequest, setNewJobPostRequest] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: ''
  })

  const [donationGoal, setDonationGoal] = useState(10000)
  const [currentDonations, setCurrentDonations] = useState(6500)

  const [skills, setSkills] = useState([
    { name: 'Leadership', level: 80 },
    { name: 'Communication', level: 90 },
    { name: 'Problem Solving', level: 85 },
    { name: 'Teamwork', level: 95 },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New job posting in your field", read: false },
    { id: 2, message: "Upcoming alumni event next week", read: false },
    { id: 3, message: "Your mentor request has been approved", read: true },
  ])

  const handleNewEventRequestChange = (field, value) => {
    setNewEventRequest(prev => ({ ...prev, [field]: value }))
  }

  const submitNewEventRequest = () => {
    console.log('Submitting new event request:', newEventRequest)
    toast({
      title: "Event Request Submitted",
      description: "Your event request has been sent for approval.",
    })
    setNewEventRequest({ title: '', date: '', time: '', description: '', expectedAttendees: '' })
  }

  const handleNewJobPostRequestChange = (field, value) => {
    setNewJobPostRequest(prev => ({ ...prev, [field]: value }))
  }

  const submitNewJobPostRequest = () => {
    console.log('Submitting new job post request:', newJobPostRequest)
    toast({
      title: "Job Post Request Submitted",
      description: "Your job post request has been sent for approval.",
    })
    setNewJobPostRequest({ title: '', company: '', location: '', description: '', requirements: '', salary: '' })
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Alumni Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <p className={`${notif.read ? 'text-muted-foreground' : 'font-medium'}`}>{notif.message}</p>
                    {!notif.read && (
                      <Button variant="outline" size="sm" onClick={() => markNotificationAsRead(notif.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Alumni" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">in the last 6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">currently mentoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Referrals</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">made this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">alumni connections</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="jobs">Job Board</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="giving">Giving Back</TabsTrigger>
          <TabsTrigger value="skills">Skills & Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Stay connected with your alma mater</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                    <Button variant="outline">RSVP</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full mr-2">
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Request New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request New Event</DialogTitle>
                    <DialogDescription>
                      Propose a new event for the alumni community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="event-title"
                        value={newEventRequest.title}
                        onChange={(e) => handleNewEventRequestChange('title', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={newEventRequest.date}
                        onChange={(e) => handleNewEventRequestChange('date', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-time" className="text-right">
                        Time
                      </Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={newEventRequest.time}
                        onChange={(e) => handleNewEventRequestChange('time', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="event-description"
                        value={newEventRequest.description}
                        onChange={(e) => handleNewEventRequestChange('description', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-attendees" className="text-right">
                        Expected Attendees
                      </Label>
                      <Input
                        id="event-attendees"
                        type="number"
                        value={newEventRequest.expectedAttendees}
                        onChange={(e) => handleNewEventRequestChange('expectedAttendees', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={submitNewEventRequest}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Board</CardTitle>
              <CardDescription>Exclusive job postings for alumni</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {jobPostings.map((job) => (
                  <li key={job.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                    </div>
                    <Button variant="outline">Apply</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full mr-2">
                <Briefcase className="mr-2 h-4 w-4" />
                View All Jobs
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Request Job Posting
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Job Posting</DialogTitle>
                    <DialogDescription>
                      Submit a job posting for approval.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="job-title"
                        value={newJobPostRequest.title}
                        onChange={(e) => handleNewJobPostRequestChange('title', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-company" className="text-right">
                        Company
                      </Label>
                      <Input
                        id="job-company"
                        value={newJobPostRequest.company}
                        onChange={(e) => handleNewJobPostRequestChange('company', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="job-location"
                        value={newJobPostRequest.location}
                        onChange={(e) => handleNewJobPostRequestChange('location', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="job-description"
                        value={newJobPostRequest.description}
                        onChange={(e) => handleNewJobPostRequestChange('description', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-requirements" className="text-right">
                        Requirements
                      </Label>
                      <Textarea
                        id="job-requirements"
                        value={newJobPostRequest.requirements}
                        onChange={(e) => handleNewJobPostRequestChange('requirements', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="job-salary" className="text-right">
                        Salary Range
                      </Label>
                      <Input
                        id="job-salary"
                        value={newJobPostRequest.salary}
                        onChange={(e) => handleNewJobPostRequestChange('salary', e.target.value)}
                        className="col-span-3"
                        placeholder="e.g. $50,000 - $70,000"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={submitNewJobPostRequest}>Submit Job Posting</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="mentorship">
          <Card>
            <CardHeader>
              <CardTitle>Mentorship Program</CardTitle>
              <CardDescription>Guide the next generation of professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mentorship-area">Area of Expertise</Label>
                  <Select>
                    <SelectTrigger id="mentorship-area">
                      <SelectValue placeholder="Select your area of expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-development">Software Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mentorship-availability">Availability (hours per week)</Label>
                  <Input id="mentorship-availability" type="number" placeholder="e.g. 2" />
                </div>
                <div>
                  <Label htmlFor="mentorship-goals">Mentorship Goals</Label>
                  <Textarea id="mentorship-goals" placeholder="Describe your goals for mentoring" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Submit Mentorship Application
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="giving">
          <Card>
            <CardHeader>
              <CardTitle>Giving Back</CardTitle>
              <CardDescription>Support your alma mater and future generations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Donation Progress</Label>
                  <Progress value={(currentDonations / donationGoal) * 100} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    ${currentDonations.toLocaleString()} raised of ${donationGoal.toLocaleString()} goal
                  </p>
                </div>
                <div>
                  <Label htmlFor="donation-amount">Donation Amount</Label>
                  <div className="flex mt-1">
                    <Input
                      id="donation-amount"
                      type="number"
                      placeholder="Enter amount"
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Donate
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Other Ways to Give Back</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Volunteer for Alumni Events</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Offer Internships</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Guest Lecture</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Impact Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Achievements</CardTitle>
              <CardDescription>Track your professional growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Key Skills</Label>
                  {skills.map((skill, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
                <div>
                  <Label className="mb-2 block">Recent Achievements</Label>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Completed Advanced Leadership Course</li>
                    <li>Published article in Industry Journal</li>
                    <li>Mentored 5 students to successful job placements</li>
                  </ul>
                </div>
                <div>
                  <Label className="mb-2 block">Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Project Management Professional (PMP)</Badge>
                    <Badge variant="secondary">Certified Information Systems Security Professional (CISSP)</Badge>
                    <Badge variant="secondary">AWS Certified Solutions Architect</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Update Professional Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button className="w-full justify-start" asChild>
          <Link href="/alumni/profile">
            <GraduationCap className="mr-2 h-4 w-4" />
            Update Profile
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/alumni/network">
            <Users className="mr-2 h-4 w-4" />
            Alumni Network
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/alumni/resources">
            <BookOpen className="mr-2 h-4 w-4" />
            Alumni Resources
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link href="/alumni/messaging">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Link>
        </Button>
      </div>
    </div>
  )
}
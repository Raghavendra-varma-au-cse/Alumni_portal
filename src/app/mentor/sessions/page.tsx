"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// This would typically come from an API call
const getMentorSessionsData = () => {
  return [
    {
      id: 1,
      mentee: { name: "John Doe", role: "Student", imageUrl: "/placeholder.svg?height=50&width=50" },
      topic: "Career Guidance in Tech",
      date: "2023-06-15",
      time: "14:00",
      status: "Upcoming",
    },
    {
      id: 2,
      mentee: { name: "Jane Smith", role: "Recent Graduate", imageUrl: "/placeholder.svg?height=50&width=50" },
      topic: "Job Search Strategies",
      date: "2023-06-10",
      time: "10:00",
      status: "Completed",
    },
  ]
}

export default function MentorSessions() {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getMentorSessionsData()
    setSessions(data)
  }, [])

  const handleAddNotes = (sessionId, notes) => {
    // In a real app, this would be an API call to update the session
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, notes } : session
    ))
    setSelectedSession(null)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mentor Sessions</h1>

      <div className="space-y-6">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={session.mentee.imageUrl} alt={session.mentee.name} />
                    <AvatarFallback>{session.mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{session.mentee.name}</CardTitle>
                    <CardDescription>{session.mentee.role}</CardDescription>
                  </div>
                </div>
                <Badge variant={session.status === "Upcoming" ? "default" : "secondary"}>{session.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p><strong>Topic:</strong> {session.topic}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reschedule</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedSession(session)}>Add Notes</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Session Notes</DialogTitle>
                    <DialogDescription>Add notes for your session with {session.mentee.name}</DialogDescription>
                  </DialogHeader>
                  <Textarea 
                    placeholder="Enter your session notes here..."
                    className="min-h-[100px]"
                  />
                  <DialogFooter>
                    <Button onClick={() => handleAddNotes(session.id, "Sample notes")}>Save Notes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
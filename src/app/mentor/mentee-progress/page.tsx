"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart2, BookOpen, Calendar } from 'lucide-react'

const mentees = [
  { id: 1, name: "Alice Johnson", progress: 75, lastSession: "2023-07-10", nextSession: "2023-07-17", quizzesTaken: 5, averageScore: 85 },
  { id: 2, name: "Bob Smith", progress: 60, lastSession: "2023-07-08", nextSession: "2023-07-15", quizzesTaken: 4, averageScore: 78 },
  { id: 3, name: "Carol Williams", progress: 90, lastSession: "2023-07-12", nextSession: "2023-07-19", quizzesTaken: 6, averageScore: 92 },
]

export default function MenteeProgress() {
  const [selectedMentee, setSelectedMentee] = useState(null)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mentee Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mentees Overview</CardTitle>
            <CardDescription>Track your mentees' progress and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentee</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Session</TableHead>
                  <TableHead>Next Session</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentees.map((mentee) => (
                  <TableRow key={mentee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarFallback>{mentee.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{mentee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Progress value={mentee.progress} className="w-[60px]" />
                    </TableCell>
                    <TableCell>{mentee.lastSession}</TableCell>
                    <TableCell>{mentee.nextSession}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => setSelectedMentee(mentee)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentee Details</CardTitle>
            <CardDescription>In-depth information about the selected mentee</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMentee ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback>{selectedMentee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedMentee.name}</h3>
                    <p className="text-sm text-muted-foreground">Joined 3 months ago</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Overall Progress</p>
                    <div className="flex items-center mt-1">
                      <Progress value={selectedMentee.progress} className="w-[60px] mr-2" />
                      <span>{selectedMentee.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quizzes Taken</p>
                    <div className="flex items-center mt-1">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{selectedMentee.quizzesTaken}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average Quiz Score</p>
                    <div className="flex items-center mt-1">
                      <BarChart2 className="w-4 h-4 mr-2" />
                      <span>{selectedMentee.averageScore}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Session</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{selectedMentee.nextSession}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>Git</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Select a mentee to view details</p>
            )}
          </CardContent>
          {selectedMentee && (
            <CardFooter>
              <Button className="w-full">Schedule Session</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
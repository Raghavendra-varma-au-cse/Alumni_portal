"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

const initialQuizzes = [
  { id: 1, title: "Web Development Fundamentals", questionCount: 10, lastUpdated: "2023-07-01" },
  { id: 2, title: "JavaScript Basics", questionCount: 15, lastUpdated: "2023-07-05" },
  { id: 3, title: "React Essentials", questionCount: 12, lastUpdated: "2023-07-10" },
]

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState(initialQuizzes)
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: [] })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addQuiz = () => {
    setQuizzes([...quizzes, { ...newQuiz, id: quizzes.length + 1, questionCount: newQuiz.questions.length, lastUpdated: new Date().toISOString().split('T')[0] }])
    setNewQuiz({ title: '', questions: [] })
    setIsDialogOpen(false)
  }

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id))
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Manage Quizzes</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quizzes</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Quiz
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Quiz</DialogTitle>
                  <DialogDescription>Add a new quiz to your collection.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="title">Quiz Title</Label>
                    <Input
                      id="title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="questions">Questions (one per line)</Label>
                    <Textarea
                      id="questions"
                      value={newQuiz.questions.join('\n')}
                      onChange={(e) => setNewQuiz({...newQuiz, questions: e.target.value.split('\n')})}
                      rows={5}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addQuiz}>Create Quiz</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.questionCount}</TableCell>
                  <TableCell>{quiz.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => deleteQuiz(quiz.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
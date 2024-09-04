"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

// This would typically come from an API
const getQuiz = () => ({
  id: 1,
  title: "Web Development Fundamentals",
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Hyper Text Modern Language"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which of the following is not a JavaScript data type?",
      options: [
        "String",
        "Boolean",
        "Float",
        "Undefined"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: 2
    }
  ]
})

export default function Quiz() {
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    setQuiz(getQuiz())
  }, [])

  const handleAnswer = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  if (!quiz) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">{quiz.title}</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {quizCompleted ? "Quiz Completed" : `Question ${currentQuestion + 1} of ${quiz.questions.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <>
              <p className="text-lg mb-4">{quiz.questions[currentQuestion].question}</p>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={index} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div className="text-center">
              <p className="text-2xl mb-4">Your score: {score} out of {quiz.questions.length}</p>
              <p>
                {score === quiz.questions.length ? "Perfect score! Great job!" :
                 score >= quiz.questions.length / 2 ? "Good effort! Keep practicing to improve." :
                 "You might want to review the material and try again."}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {!quizCompleted ? (
            <>
              <Progress value={(currentQuestion + 1) / quiz.questions.length * 100} className="w-full mr-4" />
              <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
                {currentQuestion + 1 === quiz.questions.length ? "Finish" : "Next"}
              </Button>
            </>
          ) : (
            <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
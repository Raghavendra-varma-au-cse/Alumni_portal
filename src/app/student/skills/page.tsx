"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// This would typically come from an API call
const getSkillsData = () => {
  return {
    completedAssessments: [
      { id: 1, name: "Web Development", score: 85, date: "2023-05-15" },
      { id: 2, name: "Data Analysis", score: 72, date: "2023-05-20" },
    ],
    availableAssessments: [
      { id: 3, name: "Machine Learning", description: "Test your knowledge of ML algorithms and applications" },
      { id: 4, name: "UX Design", description: "Evaluate your understanding of user experience principles" },
    ],
    skillLevels: [
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 65 },
      { name: "UI/UX Design", level: 70 },
      { name: "Data Visualization", level: 55 },
    ]
  }
}

export default function SkillAssessment() {
  const [skillsData, setSkillsData] = useState(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getSkillsData()
    setSkillsData(data)
  }, [])

  if (!skillsData) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Skill Assessment</h1>

      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="skills">My Skills</TabsTrigger>
          <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
          <TabsTrigger value="available">Available Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>My Skill Levels</CardTitle>
              <CardDescription>Track your progress in various skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillsData.skillLevels.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Assessments</CardTitle>
              <CardDescription>Review your past assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.completedAssessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader>
                      <CardTitle>{assessment.name}</CardTitle>
                      <CardDescription>Completed on {assessment.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Score:</span>
                        <Badge variant={assessment.score >= 80 ? "default" : "secondary"}>
                          {assessment.score}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Assessments</CardTitle>
              <CardDescription>Take new assessments to evaluate your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.availableAssessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader>
                      <CardTitle>{assessment.name}</CardTitle>
                      <CardDescription>{assessment.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button>Start Assessment</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
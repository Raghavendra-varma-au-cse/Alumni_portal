"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// This would typically come from an API call
const getMentorProfile = () => {
  return {
    name: "Alice Johnson",
    role: "Senior Software Engineer",
    company: "Tech Corp",
    bio: "Experienced software engineer with 10+ years in the industry. Passionate about mentoring and helping others grow in their tech careers.",
    expertise: ["Web Development", "Machine Learning", "Cloud Computing"],
    imageUrl: "/placeholder.svg?height=200&width=200",
  }
}

export default function EditMentorProfile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const data = getMentorProfile()
    setProfile(data)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleExpertiseChange = (e) => {
    const expertise = e.target.value.split(',').map(item => item.trim())
    setProfile(prev => ({ ...prev, expertise }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would be an API call to update the profile
    console.log('Updated profile:', profile)
    // Redirect or show success message
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Mentor Profile</CardTitle>
          <CardDescription>Update your information to help mentees find and connect with you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.imageUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={profile.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={profile.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise">Expertise (comma-separated)</Label>
              <Input
                id="expertise"
                name="expertise"
                value={profile.expertise.join(', ')}
                onChange={handleExpertiseChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
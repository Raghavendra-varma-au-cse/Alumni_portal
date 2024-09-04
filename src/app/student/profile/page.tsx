"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    major: "Computer Science",
    graduationYear: "2024",
    bio: "Aspiring software engineer with a passion for AI and machine learning.",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    notifications: {
      email: true,
      sms: false,
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (type) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the updated profile to your backend
    console.log('Updated profile:', profile)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Profile Settings</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Avatar</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" name="major" value={profile.major} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input id="graduationYear" name="graduationYear" value={profile.graduationYear} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={profile.notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={profile.notifications.sms}
                onCheckedChange={() => handleNotificationChange('sms')}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}
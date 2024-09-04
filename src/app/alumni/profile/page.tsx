"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/components/ui/use-toast'
import { User, Mail, Phone, Briefcase, MapPin, GraduationCap, Globe, Shield, Loader2 } from 'lucide-react'

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    graduationYear: '2015',
    degree: 'Bachelor of Science in Computer Science',
    bio: 'Passionate software engineer with 7+ years of experience...',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://www.johndoe.com',
    privacySettings: {
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  })

  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string) => {
    setProfile((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [field]: !prev.privacySettings[field],
      },
    }))
  }

  const handleSave = () => {
    console.log('Saving profile:', profile)
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    })
  }

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setProfile(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))
          // Here you would typically use a reverse geocoding service to get the location name
          // For this example, we'll just use the coordinates
          handleInputChange('location', `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`)
          setIsLoadingLocation(false)
          toast({
            title: 'Location Updated',
            description: 'Your current location has been set.',
          })
        },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message)
          setIsLoadingLocation(false)
          toast({
            title: 'Location Error',
            description: 'Unable to retrieve your location. Please enter it manually.',
            variant: 'destructive',
          })
        }
      )
    } else {
      setIsLoadingLocation(false)
      toast({
        title: 'Geolocation Unavailable',
        description: 'Your browser does not support geolocation.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Profile Settings</h1>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="professional">Professional Details</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Picture</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Update your work information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profile.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                    <Button onClick={handleGetCurrentLocation} disabled={isLoadingLocation}>
                      {isLoadingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                      {isLoadingLocation ? 'Loading...' : 'Get Current'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Update your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={profile.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    value={profile.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control what information is visible to others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showEmail">Show email to other alumni</Label>
                <Switch
                  id="showEmail"
                  checked={profile.privacySettings.showEmail}
                  onCheckedChange={() => handlePrivacyChange('showEmail')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showPhone">Show phone number to other alumni</Label>
                <Switch
                  id="showPhone"
                  checked={profile.privacySettings.showPhone}
                  onCheckedChange={() => handlePrivacyChange('showPhone')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showLocation">Show location to other alumni</Label>
                <Switch
                  id="showLocation"
                  checked={profile.privacySettings.showLocation}
                  onCheckedChange={() => handlePrivacyChange('showLocation')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Bell, Mail, Calendar, Briefcase, Users, GraduationCap } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'event', message: 'New alumni networking event next week', read: false, date: '2023-07-10' },
    { id: 2, type: 'job', message: 'New job posting: Software Engineer at Tech Corp', read: true, date: '2023-07-09' },
    { id: 3, type: 'mentorship', message: 'You have a new mentorship request', read: false, date: '2023-07-08' },
    { id: 4, type: 'news', message: 'University launches new research center', read: true, date: '2023-07-07' },
    { id: 5, type: 'event', message: 'Reminder: Alumni reunion this weekend', read: false, date: '2023-07-06' },
  ])

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    eventReminders: true,
    jobAlerts: true,
    mentorshipRequests: true,
    newsUpdates: false,
  })

  const handleSettingChange = (setting: string) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
    toast({
      title: 'Notifications Cleared',
      description: 'All notifications have been removed.',
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4" />
      case 'job':
        return <Briefcase className="h-4 w-4" />
      case 'mentorship':
        return <Users className="h-4 w-4" />
      case 'news':
        return <GraduationCap className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest alumni news and events</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <ul className="space-y-4">
                  {notifications.map((notif) => (
                    <li key={notif.id} className="flex items-start space-x-4">
                      <div className={`mt-1 ${notif.read ? 'text-gray-400' : 'text-blue-500'}`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <p className={`${notif.read ? 'text-gray-600' : 'font-medium'}`}>{notif.message}</p>
                        <p className="text-sm text-gray-500">{notif.date}</p>
                      </div>
                      {!notif.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notif.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No new notifications</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={clearAllNotifications}>
                Clear All Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleSettingChange('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleSettingChange('pushNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="eventReminders">Event Reminders</Label>
                <Switch
                  id="eventReminders"
                  checked={settings.eventReminders}
                  onCheckedChange={() => handleSettingChange('eventReminders')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="jobAlerts">Job Alerts</Label>
                <Switch
                  id="jobAlerts"
                  checked={settings.jobAlerts}
                  onCheckedChange={() => handleSettingChange('jobAlerts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mentorshipRequests">Mentorship Requests</Label>
                <Switch
                  id="mentorshipRequests"
                  checked={settings.mentorshipRequests}
                  onCheckedChange={() => handleSettingChange('mentorshipRequests')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newsUpdates">News Updates</Label>
                <Switch
                  id="newsUpdates"
                  checked={settings.newsUpdates}
                  onCheckedChange={() => handleSettingChange('newsUpdates')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => toast({ title: 'Settings Saved', description: 'Your notification preferences have been updated.' })}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
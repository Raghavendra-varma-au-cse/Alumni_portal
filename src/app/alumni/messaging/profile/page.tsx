'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/components/ui/use-toast'

export default function UserProfilePage() {
  const router = useRouter()
  const [name, setName] = useState('John Doe')
  const [status, setStatus] = useState('online')
  const [bio, setBio] = useState('Alumni from Class of 2020')

  const handleSave = (e) => {
    e.preventDefault()
    // In a real app, you'd save these settings to your backend
    toast({ title: "Profile updated" })
    router.push('/alumni/messaging')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4 flex items-center">
        <Avatar className="h-20 w-20 mr-4">
          <AvatarImage src="/placeholder-avatar-1.jpg" alt="Profile picture" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button>Change Avatar</Button>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.push('/alumni/messaging')}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
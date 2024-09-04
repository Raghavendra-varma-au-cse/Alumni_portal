'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export default function ChannelSettingsPage() {
  const router = useRouter()
  const [channelName, setChannelName] = useState('general')
  const [channelType, setChannelType] = useState('text')
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    // In a real app, you'd save these settings to your backend
    toast({ title: "Channel settings saved" })
    router.push('/alumni/messaging')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Channel Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <Label htmlFor="channel-name">Channel Name</Label>
          <Input 
            id="channel-name" 
            value={channelName} 
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="channel-type">Channel Type</Label>
          <Select value={channelType} onValueChange={setChannelType}>
            <SelectTrigger id="channel-type">
              <SelectValue placeholder="Select channel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Channel</SelectItem>
              <SelectItem value="voice">Voice Channel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="private" 
            checked={isPrivate} 
            onCheckedChange={setIsPrivate}
          />
          <Label htmlFor="private">Private Channel</Label>
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
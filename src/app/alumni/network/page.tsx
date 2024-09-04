"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Search, UserPlus, MessageSquare, MapPin } from 'lucide-react'

const WorldMap = ({ alumni, filteredAlumni }) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-auto mb-8 bg-gray-100 rounded-lg"
    >
      {/* Simplified world map paths */}
      <path
        d="M150,50 L850,50 L850,450 L150,450 Z"
        fill="#e0e0e0"
        stroke="#c0c0c0"
        strokeWidth="2"
      />
      {/* You would add more detailed map paths here for a real world map */}
      
      {/* Plot alumni locations */}
      {alumni.map((alum) => {
        const isFiltered = filteredAlumni.some(a => a.id === alum.id)
        return (
          <circle
            key={alum.id}
            cx={alum.location.lon + 500} // Simplified coordinate transformation
            cy={250 - alum.location.lat} // Simplified coordinate transformation
            r="5"
            fill={isFiltered ? "blue" : "gray"}
            opacity={isFiltered ? 1 : 0.5}
          />
        )
      })}
    </svg>
  )
}

export default function AlumniNetworkPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [maxDistance, setMaxDistance] = useState(50)
  const [showNearbyOnly, setShowNearbyOnly] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)

  const alumni = [
    { id: 1, name: 'Alice Johnson', graduationYear: '2015', jobTitle: 'Software Engineer', company: 'Tech Corp', industry: 'Technology', location: { lat: 37.7749, lon: -122.4194 } },
    { id: 2, name: 'Bob Smith', graduationYear: '2018', jobTitle: 'Data Analyst', company: 'Data Insights Inc.', industry: 'Data Science', location: { lat: 40.7128, lon: -74.0060 } },
    { id: 3, name: 'Carol Williams', graduationYear: '2020', jobTitle: 'Product Manager', company: 'Innovate Co.', industry: 'Technology', location: { lat: 34.0522, lon: -118.2437 } },
    { id: 4, name: 'David Brown', graduationYear: '2017', jobTitle: 'Marketing Specialist', company: 'Brand Builders', industry: 'Marketing', location: { lat: 51.5074, lon: -0.1278 } },
    { id: 5, name: 'Eva Martinez', graduationYear: '2019', jobTitle: 'UX Designer', company: 'Design Masters', industry: 'Design', location: { lat: 48.8566, lon: 2.3522 } },
  ]

  useEffect(() => {
    // Simulating getting user's location
    // In a real application, you would use the Geolocation API
    setUserLocation({ lat: 37.7749, lon: -122.4194 })
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alum.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alum.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = filterYear === 'all' || alum.graduationYear === filterYear
    const matchesIndustry = filterIndustry === 'all' || alum.industry === filterIndustry
    const matchesDistance = !showNearbyOnly || (userLocation && calculateDistance(userLocation.lat, userLocation.lon, alum.location.lat, alum.location.lon) <= maxDistance)
    return matchesSearch && matchesYear && matchesIndustry && matchesDistance
  })

  const handleConnect = (alumName: string) => {
    toast({
      title: 'Connection Request Sent',
      description: `You've sent a connection request to ${alumName}.`,
    })
  }

  const handleMessage = (alumName: string) => {
    toast({
      title: 'Message Sent',
      description: `You've opened a chat with ${alumName}.`,
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Alumni Network</h1>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search alumni by name, job title, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-2/3">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Graduation Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="2018">2018</SelectItem>
              <SelectItem value="2017">2017</SelectItem>
              <SelectItem value="2016">2016</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="nearby-only"
            checked={showNearbyOnly}
            onCheckedChange={setShowNearbyOnly}
          />
          <Label htmlFor="nearby-only">Show Nearby Alumni Only</Label>
        </div>
        {showNearbyOnly && (
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <Label htmlFor="max-distance">Max Distance: {maxDistance} km</Label>
            <Slider
              id="max-distance"
              min={10}
              max={500}
              step={10}
              value={[maxDistance]}
              onValueChange={([value]) => setMaxDistance(value)}
              className="w-[200px]"
            />
          </div>
        )}
      </div>

      <WorldMap alumni={alumni} filteredAlumni={filteredAlumni} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alum => (
          <Card key={alum.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder-avatar-${alum.id}.jpg`} alt={alum.name} />
                  <AvatarFallback>{alum.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{alum.name}</CardTitle>
                  <CardDescription>Class of {alum.graduationYear}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{alum.jobTitle}</p>
              <p className="text-sm text-gray-600 mb-2">{alum.company}</p>
              <Badge>{alum.industry}</Badge>
              {userLocation && (
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {Math.round(calculateDistance(userLocation.lat, userLocation.lon, alum.location.lat, alum.location.lon))} km away
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleConnect(alum.name)}>
                <UserPlus className="mr-2 h-4 w-4" /> Connect
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleMessage(alum.name)}>
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
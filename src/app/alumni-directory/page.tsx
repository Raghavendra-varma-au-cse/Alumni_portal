"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type AlumniProfile = {
  id: string
  name: string
  graduationYear: string
  field: string
  company: string
  location: string
}

const alumniData: AlumniProfile[] = [
  {
    id: "1",
    name: "John Doe",
    graduationYear: "2015",
    field: "Computer Science",
    company: "Tech Corp",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Jane Smith",
    graduationYear: "2018",
    field: "Business Administration",
    company: "Finance Inc",
    location: "New York, NY",
  },
  // Add more mock data here
]

export default function AlumniDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState('')

  const filteredAlumni = alumniData.filter(alumni => 
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterField === '' || alumni.field === filterField)
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Alumni Directory</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search alumni..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={filterField} onValueChange={setFilterField}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Fields</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Business Administration">Business Administration</SelectItem>
            {/* Add more fields as needed */}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumni => (
          <Card key={alumni.id}>
            <CardContent className="flex items-center space-x-4 p-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://i.pravatar.cc/64?u=${alumni.id}`} alt={alumni.name} />
                <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-semibold">{alumni.name}</h3>
                <p className="text-sm text-gray-500">Class of {alumni.graduationYear}</p>
                <p className="text-sm">{alumni.field}</p>
                <p className="text-sm">{alumni.company}</p>
                <p className="text-sm text-gray-500">{alumni.location}</p>
                <Button size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
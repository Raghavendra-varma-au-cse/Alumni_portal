"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Search, Filter } from 'lucide-react'

type SuccessStory = {
  id: string
  name: string
  graduationYear: string
  industry: string
  company: string
  position: string
  story: string
  image: string
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'John Doe',
    graduationYear: '2010',
    industry: 'Technology',
    company: 'Tech Giants Inc.',
    position: 'CEO',
    story: 'After graduating, I founded a startup that revolutionized the tech industry...',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    graduationYear: '2015',
    industry: 'Healthcare',
    company: 'MediCare Solutions',
    position: 'Chief Medical Officer',
    story: 'My research in biotechnology led to groundbreaking treatments...',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  // Add more success stories here
]

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStories = successStories.filter((story) =>
    (story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.industry.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === '' || story.industry === filter)
  )

  const industries = Array.from(new Set(successStories.map((story) => story.industry)))

  return (
    <div className="container mx-auto py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Alumni Success Stories
      </motion.h1>

      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button onClick={() => setFilter('')}>
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <Badge
              key={industry}
              variant={filter === industry ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter(industry)}
            >
              {industry}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={story.image} alt={story.name} />
                        <AvatarFallback>{story.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{story.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Class of {story.graduationYear}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2"><strong>{story.position}</strong> at {story.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
                    <Badge>{story.industry}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="flex items-center space-x-4 py-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>{story.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-bold">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">Class of {story.graduationYear}</p>
                      <p><strong>{story.position}</strong> at {story.company}</p>
                      <Badge className="mt-2">{story.industry}</Badge>
                    </div>
                    <Button variant="outline">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Featured Alumni</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.slice(0, 3).map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{story.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{story.position} at {story.company}</p>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Submit Your Success Story</h2>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4">We'd love to hear about your achievements and share them with the alumni community. Submit your success story and inspire others!</p>
            <Button>Share Your Story</Button>
          </CardContent>
        </Card>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Alumni Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>1000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Success stories shared</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Countries represented</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>$10M+</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Raised for scholarships</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
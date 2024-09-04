"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/use-toast'
import { Search, Download, ExternalLink, BookOpen, Video, FileText, Star } from 'lucide-react'

export default function AlumniResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const resources = [
    { id: 1, title: 'Career Development Guide', type: 'document', category: 'career', rating: 4.5, favorites: 120, isFavorite: false },
    { id: 2, title: 'Alumni Networking Tips', type: 'video', category: 'networking', rating: 4.2, favorites: 95, isFavorite: true },
    { id: 3, title: 'Industry Trends Report 2023', type: 'document', category: 'industry', rating: 4.8, favorites: 200, isFavorite: false },
    { id: 4, title: 'Interview Preparation Workshop', type: 'video', category: 'career', rating: 4.6, favorites: 150, isFavorite: true },
    { id: 5, title: 'Alumni Success Stories', type: 'article', category: 'inspiration', rating: 4.3, favorites: 80, isFavorite: false },
    { id: 6, title: 'Continuing Education Opportunities', type: 'document', category: 'education', rating: 4.4, favorites: 110, isFavorite: false },
  ]

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || resource.type === filterType) &&
    (filterCategory === '' || resource.category === filterCategory) &&
    (!showFavoritesOnly || resource.isFavorite)
  )

  const handleDownload = (resourceTitle: string) => {
    toast({
      title: 'Download Started',
      description: `You've started downloading ${resourceTitle}.`,
    })
  }

  const handleView = (resourceTitle: string) => {
    toast({
      title: 'Resource Opened',
      description: `You're now viewing ${resourceTitle}.`,
    })
  }

  const toggleFavorite = (resourceId: number) => {
    // In a real application, you would update this in your backend
    resources.forEach(resource => {
      if (resource.id === resourceId) {
        resource.isFavorite = !resource.isFavorite
        resource.favorites += resource.isFavorite ? 1 : -1
      }
    })
    // Force a re-render
    setSearchTerm(searchTerm)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      case 'article':
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Alumni Resources</h1>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search resources"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="article">Article</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
              <SelectItem value="industry">Industry</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="favorites-only"
            checked={showFavoritesOnly}
            onCheckedChange={(checked) => setShowFavoritesOnly(checked as boolean)}
          />
          <label
            htmlFor="favorites-only"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Favorites Only
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  {getIcon(resource.type)}
                  <span className="ml-2">{resource.title}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(resource.id)}
                >
                  <Star className={`h-4 w-4 ${resource.isFavorite ? 'fill-yellow-400' : ''}`} />
                </Button>
              </CardTitle>
              <CardDescription>
                <Badge>{resource.category}</Badge>
                <span className="ml-2 text-sm">
                  {resource.rating} ★ ({resource.favorites} favorites)
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {resource.type === 'document' && 'Downloadable document'}
                {resource.type === 'video' && 'Video content'}
                {resource.type === 'article' && 'Online article'}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              {resource.type === 'document' ? (
                <Button variant="outline" size="sm" onClick={() => handleDownload(resource.title)}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleView(resource.title)}>
                  <ExternalLink className="mr-2 h-4 w-4" /> View
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
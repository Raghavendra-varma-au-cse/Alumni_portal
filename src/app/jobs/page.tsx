import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Briefcase, MapPin } from 'lucide-react'

export default function JobPortalPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Job Portal</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-sm"
          type="search"
          placeholder="Search jobs..."
        />
        <Button>Post a Job</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Job Title</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Company Name</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
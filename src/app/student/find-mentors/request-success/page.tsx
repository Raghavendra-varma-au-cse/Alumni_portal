import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function MentorshipRequestSuccess() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mentorship Request Submitted!</CardTitle>
          <CardDescription className="text-center">Your request has been sent to the mentor.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Thank you for reaching out to one of our alumni mentors. They will review your request and get back to you soon.
          </p>
          <p className="text-center mb-4">
            In the meantime, feel free to explore other mentorship opportunities or resources on our platform.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/student/find-mentors">
            <Button variant="outline">Back to Mentor Panel</Button>
          </Link>
          <Link href="/student/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
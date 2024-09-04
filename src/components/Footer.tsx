import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Footer = () => (
  <footer className="bg-background border-t">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-muted-foreground">
            The Alumni Portal connects graduates, fostering a strong community and providing valuable resources for personal and professional growth.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/events" className="text-sm hover:underline">Events</Link></li>
            <li><Link href="/jobs" className="text-sm hover:underline">Job Board</Link></li>
            <li><Link href="/mentorship" className="text-sm hover:underline">Mentorship Program</Link></li>
            <li><Link href="/donate" className="text-sm hover:underline">Support Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-muted-foreground">123 University Ave, City, State 12345</p>
          <p className="text-sm text-muted-foreground">Phone: (123) 456-7890</p>
          <p className="text-sm text-muted-foreground">Email: alumni@university.edu</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <form className="space-y-2">
            <Input type="email" placeholder="Enter your email" />
            <Button type="submit" className="w-full">Subscribe</Button>
          </form>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alumni Portal. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
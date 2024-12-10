import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container min-h-screen grid place-items-center">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted p-4 rounded-full">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter">
              Page Not Found
            </h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Try one of these instead:
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center">
            <Button asChild variant="default">
              <Link href="/">
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/convert/video/webm/to-mp4">
                Convert WebM to MP4
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Error 404 - Page Not Found
        </div>
      </div>
    </main>
  )
} 
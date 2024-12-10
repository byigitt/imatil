'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="mb-6 text-muted-foreground hover:text-foreground"
    >
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  )
} 
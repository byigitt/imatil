'use client'

import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <Progress
      value={Math.min(100, Math.max(0, progress))}
      className={className}
    />
  )
} 
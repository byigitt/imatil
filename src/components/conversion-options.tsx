'use client'

import { Zap, Sparkles } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { ConversionOptions } from '@/lib/ffmpeg/types'

interface SpeedSelectorProps {
  speed: NonNullable<ConversionOptions['speed']>
  onSpeedChange: (value: NonNullable<ConversionOptions['speed']>) => void
  disabled?: boolean
}

interface QualitySelectorProps {
  quality: NonNullable<ConversionOptions['quality']>
  onQualityChange: (value: NonNullable<ConversionOptions['quality']>) => void
  disabled?: boolean
  type: 'video' | 'image'
}

export function SpeedSelector({
  speed,
  onSpeedChange,
  disabled = false,
}: SpeedSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="speed">Conversion Speed</Label>
      <Select
        value={speed}
        onValueChange={onSpeedChange}
        disabled={disabled}
      >
        <SelectTrigger id="speed">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fast">
            <div className="flex items-center">
              Fast
              <Zap className="ml-2 h-4 w-4" />
            </div>
          </SelectItem>
          <SelectItem value="medium">Medium (Balanced)</SelectItem>
          <SelectItem value="slow">Slow (Best Quality)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {speed === 'fast' && 'Fastest conversion with good quality'}
        {speed === 'medium' && 'Balanced between speed and quality'}
        {speed === 'slow' && 'Best possible quality, but slower conversion'}
      </p>
    </div>
  )
}

export function QualitySelector({
  quality,
  onQualityChange,
  disabled = false,
  type,
}: QualitySelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="quality">Output Quality</Label>
      <Select
        value={quality}
        onValueChange={onQualityChange}
        disabled={disabled}
      >
        <SelectTrigger id="quality">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">
            <div className="flex items-center">
              High Quality
              <Sparkles className="ml-2 h-4 w-4" />
            </div>
          </SelectItem>
          <SelectItem value="medium">Medium Quality</SelectItem>
          <SelectItem value="low">Low Quality</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {type === 'video' ? (
          <>
            {quality === 'high' && 'Best video quality, larger file size'}
            {quality === 'medium' && 'Balanced quality and file size'}
            {quality === 'low' && 'Smaller file size, reduced quality'}
          </>
        ) : (
          <>
            {quality === 'high' && 'Maximum image quality, larger file size'}
            {quality === 'medium' && 'Good balance of quality and compression'}
            {quality === 'low' && 'Maximum compression, reduced quality'}
          </>
        )}
      </p>
    </div>
  )
} 
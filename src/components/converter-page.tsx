'use client'

import { useState } from 'react'
import { FileDropzone } from '@/components/file-dropzone'
import { ProgressBar } from '@/components/progress-bar'
import { SpeedSelector, QualitySelector } from '@/components/conversion-options'
import { BackButton } from '@/components/back-button'
import { useConversion } from '@/hooks/use-conversion'
import { Card } from '@/components/ui/card'
import type { ConversionOptions, VideoFormat, ImageFormat, ImageConversionOptions } from '@/lib/ffmpeg/types'

interface ConverterPageProps {
  fromFormat: VideoFormat | ImageFormat
  toFormat: VideoFormat | ImageFormat
  title: string
  description: string
  acceptTypes: Record<string, string[]>
  features: string[] | undefined
  type: 'video' | 'image'
}

export function ConverterPage({
  fromFormat,
  toFormat,
  title,
  description,
  acceptTypes,
  features,
  type,
}: ConverterPageProps) {
  const [speed, setSpeed] = useState<NonNullable<ConversionOptions['speed']>>('fast')
  const [quality, setQuality] = useState<NonNullable<ConversionOptions['quality']>>('medium')
  
  const {
    isReady,
    isLoading,
    isConverting,
    progress,
    error,
    handleFileSelect,
  } = useConversion({
    fromFormat,
    toFormat,
    acceptTypes,
  })

  const handleFileSelectWithOptions = async (file: File) => {
    const options: ConversionOptions | ImageConversionOptions = type === 'video' 
      ? { speed, quality }
      : { quality }
    
    await handleFileSelect(file, options)
  }

  return (
    <main className="container min-h-screen py-10">
      <div className="mx-auto max-w-xl">
        <BackButton />
        
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {title}
            </h1>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>

          <Card className="p-6 space-y-6">
            {type === 'video' && (
              <>
              <SpeedSelector
                  speed={speed}
                  onSpeedChange={setSpeed}
                  disabled={isConverting}
                />

                <QualitySelector
                  quality={quality}
                  onQualityChange={setQuality}
                  disabled={isConverting}
                  type={type}
                />
              </>
            )}

            <FileDropzone
              isLoading={!isReady || isLoading}
              isConverting={isConverting}
              onFileSelect={handleFileSelectWithOptions}
              accept={acceptTypes}
              errorMessage={error}
              type={type}
            />

            {isConverting && (
              <div className="space-y-2">
                <ProgressBar progress={progress} />
                <p className="text-center text-sm text-muted-foreground">
                  Converting... {progress.toFixed(1)}%
                </p>
              </div>
            )}
          </Card>

          <div className="rounded-lg border bg-card p-4 text-card-foreground">
            <div className="space-y-2 text-sm">
              <h2 className="font-semibold">About {fromFormat.toUpperCase()} to {toFormat.toUpperCase()} Conversion</h2>
              <ul className="grid gap-1.5 text-muted-foreground">
                {features?.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
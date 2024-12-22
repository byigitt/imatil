'use client'

import { useState } from 'react'
import { FileDropzone } from '@/components/file-dropzone'
import { ProgressBar } from '@/components/progress-bar'
import { SpeedSelector, QualitySelector } from '@/components/conversion-options'
import { BackButton } from '@/components/back-button'
import { useConversion } from '@/hooks/use-conversion'
import { Card } from '@/components/ui/card'
import { Zap, Sparkles, ArrowRight, FileIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
            <div className="flex items-center justify-center gap-2 pt-2">
              <Badge variant="outline" className="text-xs">
                {fromFormat.toUpperCase()}
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                {toFormat.toUpperCase()}
              </Badge>
            </div>
          </div>

          <Card className="p-6 space-y-6">
            {type === 'video' && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            tabIndex={0} 
                            onBlur={(e) => {
                              if (!e.currentTarget.contains(document.activeElement)) {
                                e.currentTarget.blur();
                              }
                            }}
                          >
                            <SpeedSelector
                              speed={speed}
                              onSpeedChange={setSpeed}
                              disabled={isConverting}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <div className="space-y-2">
                            <p className="font-medium">Conversion Speed</p>
                            <div className="text-sm text-muted-foreground">
                              <p>• Fast: Quick conversion with good quality</p>
                              <p>• Medium: Balanced speed and quality</p>
                              <p>• Slow: Best quality, longer processing</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="space-y-2">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            tabIndex={0}
                            onBlur={(e) => {
                              if (!e.currentTarget.contains(document.activeElement)) {
                                e.currentTarget.blur();
                              }
                            }}
                          >
                            <QualitySelector
                              quality={quality}
                              onQualityChange={setQuality}
                              disabled={isConverting}
                              type={type}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <div className="space-y-2">
                            <p className="font-medium">Output Quality</p>
                            <div className="text-sm text-muted-foreground">
                              <p>• High: Best quality, larger file size</p>
                              <p>• Medium: Good balance of quality and size</p>
                              <p>• Low: Smaller file, reduced quality</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <Separator />
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Converting...</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <ProgressBar progress={progress} />
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>
                      {type === 'video' 
                        ? 'Optimizing video quality and compression...'
                        : 'Processing image with selected settings...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="rounded-lg border bg-card p-4 text-card-foreground">
            <div className="space-y-2 text-sm">
              <h2 className="font-semibold flex items-center gap-2">
                About {fromFormat.toUpperCase()} to {toFormat.toUpperCase()} Conversion
                <Badge variant="secondary">Info</Badge>
              </h2>
              <ul className="grid gap-2 text-muted-foreground">
                {features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
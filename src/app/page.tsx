'use client'

import { useState, useMemo } from 'react'
import { FileVideo, ArrowRight, Image, Loader2, FileIcon, Film, Camera } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

const VIDEO_SOURCE_FORMATS = ['WebM', 'MP4', 'AVI', 'MOV', 'FLV'] as const
const IMAGE_SOURCE_FORMATS = ['JPG', 'PNG', 'WebP', 'AVIF'] as const

type VideoSourceFormat = typeof VIDEO_SOURCE_FORMATS[number]
type ImageSourceFormat = typeof IMAGE_SOURCE_FORMATS[number]
type MediaType = 'video' | 'image'

const VIDEO_TARGET_FORMATS: Record<VideoSourceFormat, readonly string[]> = {
  'WebM': ['MP4', 'MOV', 'AVI', 'FLV'],
  'MP4': ['WebM', 'MOV', 'AVI', 'FLV'],
  'AVI': ['MP4', 'WebM', 'MOV', 'FLV'],
  'MOV': ['MP4', 'WebM', 'AVI', 'FLV'],
  'FLV': ['MP4', 'WebM', 'AVI', 'MOV'],
} as const

const IMAGE_TARGET_FORMATS: Record<ImageSourceFormat, readonly string[]> = {
  'JPG': ['WebP', 'PNG', 'AVIF'],
  'PNG': ['WebP', 'JPG', 'AVIF'],
  'WebP': ['JPG', 'PNG', 'AVIF'],
  'AVIF': ['WebP', 'JPG', 'PNG'],
} as const

const FORMAT_INFO = {
  'WebM': { description: 'Modern web-optimized format', badge: 'Web' },
  'MP4': { description: 'Universal compatibility', badge: 'Universal' },
  'AVI': { description: 'High quality, larger size', badge: 'Legacy' },
  'MOV': { description: 'Apple ecosystem format', badge: 'Apple' },
  'FLV': { description: 'Flash video format', badge: 'Legacy' },
  'JPG': { description: 'Compressed photos', badge: 'Photos' },
  'PNG': { description: 'Lossless with transparency', badge: 'Graphics' },
  'WebP': { description: 'Modern efficient format', badge: 'Modern' },
  'AVIF': { description: 'Next-gen image format', badge: 'Next-Gen' },
} as const

type FormatInfo = typeof FORMAT_INFO
type FormatKey = keyof FormatInfo

export default function Home() {
  const router = useRouter()
  const [mediaType, setMediaType] = useState<MediaType>('video')
  const [sourceFormat, setSourceFormat] = useState<string>('')
  const [targetFormat, setTargetFormat] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const sourceFormats = mediaType === 'video' ? VIDEO_SOURCE_FORMATS : IMAGE_SOURCE_FORMATS
  
  const availableTargetFormats = useMemo(() => {
    if (!sourceFormat) return []
    return mediaType === 'video'
      ? VIDEO_TARGET_FORMATS[sourceFormat as VideoSourceFormat] || []
      : IMAGE_TARGET_FORMATS[sourceFormat as ImageSourceFormat] || []
  }, [sourceFormat, mediaType])

  const handleConvert = () => {
    if (!sourceFormat || !targetFormat) return
    setIsLoading(true)
    const route = `/convert/${mediaType}/${sourceFormat.toLowerCase()}/${targetFormat.toLowerCase()}`
    router.push(route)
  }

  const handleMediaTypeChange = (type: MediaType) => {
    setMediaType(type)
    setSourceFormat('')
    setTargetFormat('')
  }

  return (
    <main className="container min-h-screen py-10">
      <div className="mx-auto max-w-xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            File Format Converter
          </h1>
          <p className="text-muted-foreground">
            Convert your files between different formats right in your browser
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <Tabs value={mediaType} onValueChange={(v) => handleMediaTypeChange(v as MediaType)} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video" className="space-x-2">
                  <Film className="h-4 w-4" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>Image</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="font-semibold flex items-center gap-2">
                  Source Format
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline">Step 1</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the format of your original file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sourceFormats.map((format) => (
                    <TooltipProvider key={format}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={sourceFormat === format ? "default" : "outline"}
                            className="w-full"
                            onClick={() => {
                              setSourceFormat(format)
                              setTargetFormat('')
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{format}</span>
                              <Badge 
                                variant={sourceFormat === format ? "outline" : "secondary"}
                                className={cn("ml-2", sourceFormat === format && "border-white")}
                              >
                                {FORMAT_INFO[format as FormatKey].badge}
                              </Badge>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-60">
                          <p className="text-sm">{FORMAT_INFO[format as FormatKey].description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              {sourceFormat && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h2 className="font-semibold flex items-center gap-2">
                      Target Format
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline">Step 2</Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Choose the format you want to convert to</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableTargetFormats.map((format) => (
                        <TooltipProvider key={format}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={targetFormat === format ? "default" : "outline"}
                                className="w-full"
                                onClick={() => setTargetFormat(format)}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{format}</span>
                                  <Badge 
                                    variant={targetFormat === format ? "outline" : "secondary"}
                                    className={cn("ml-2", targetFormat === format && "border-white")}
                                  >
                                    {FORMAT_INFO[format as FormatKey].badge}
                                  </Badge>
                                </div>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="w-60">
                              <p className="text-sm">{FORMAT_INFO[format as FormatKey].description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {sourceFormat && targetFormat && (
                <>
                  <Separator className="my-4" />
                  <div className="pt-2">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleConvert}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Redirecting...
                        </>
                      ) : (
                        <>
                          {mediaType === 'video' ? (
                            <FileVideo className="mr-2 h-5 w-5" />
                          ) : (
                            <Image className="mr-2 h-5 w-5" />
                          )}
                          Convert {sourceFormat} to {targetFormat}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <div className="space-y-2 text-sm">
            <h2 className="font-semibold">Features</h2>
            <ul className="grid gap-1.5 text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Client-side conversion
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                No file upload needed
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                High-quality output
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Multiple format support
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Adjustable quality
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Fast processing
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Video & image support
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />
                Modern formats
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          All conversions happen in your browser. No files are uploaded to any server.
        </div>
      </div>
    </main>
  )
}

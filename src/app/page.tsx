'use client'

import { useState, useMemo } from 'react'
import { FileVideo, ArrowRight, Image, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            <Tabs value={mediaType} onValueChange={(v) => handleMediaTypeChange(v as MediaType)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video" className="space-x-2">
                  <FileVideo className="h-4 w-4" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="space-x-2">
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <h2 className="font-semibold">What format is your {mediaType} in?</h2>
              <Select
                value={sourceFormat}
                onValueChange={(value) => {
                  setSourceFormat(value)
                  setTargetFormat('')
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Select source format"} />
                </SelectTrigger>
                <SelectContent>
                  {sourceFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {sourceFormat && (
              <div className="space-y-2">
                <h2 className="font-semibold">What format do you want to convert to?</h2>
                <Select
                  value={targetFormat}
                  onValueChange={setTargetFormat}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target format" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTargetFormats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {sourceFormat && targetFormat && (
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
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="rounded-lg border bg-card p-4 text-card-foreground">
          <div className="space-y-2 text-sm">
            <h2 className="font-semibold">Features</h2>
            <ul className="grid gap-1.5 text-muted-foreground sm:grid-cols-2">
              <li>• Client-side conversion</li>
              <li>• No file upload needed</li>
              <li>• High-quality output</li>
              <li>• Multiple format support</li>
              <li>• Adjustable quality</li>
              <li>• Fast processing</li>
              <li>• Video & image support</li>
              <li>• Modern formats (WebP, AVIF)</li>
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

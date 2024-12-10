import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'

type TargetFormats = Exclude<VideoFormat, 'mov'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mp4', 'webm']

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = false
export const fetchCache = 'force-cache'

type Params = Promise<{ slug: string[] }>;

// Generate metadata for each format
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    return {
      title: 'Format Not Found',
      description: 'The requested conversion format is not supported.',
    }
  }

  const formatName = format.toUpperCase()
  const title = `Convert MOV to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert MOV videos to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'MOV converter',
      `MOV to ${formatName}`,
      'QuickTime converter',
      'video converter',
      'online converter',
      'free converter',
      'browser-based',
      'no upload',
      'secure conversion',
      format.toLowerCase(),
      'video format',
      'file converter',
      'WebAssembly',
      'FFmpeg',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'imatil',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/convert/video/mov/${format}`,
    },
  }
}

export default async function MovConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats

  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts MOV videos to AVI format',
      'Wide compatibility',
      'Maintains quality',
      'Smaller file size',
      'Windows friendly',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MOV videos to FLV format',
      'Web streaming ready',
      'Flash compatibility',
      'Reduced file size',
      'Quick processing',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MOV videos to MKV format',
      'Multiple audio tracks',
      'Subtitle support',
      'High quality output',
      'Modern container',
      'Fast, browser-based conversion',
    ],
    mp4: [
      'Converts MOV videos to MP4 format',
      'Universal playback',
      'Mobile friendly',
      'Efficient compression',
      'Perfect for sharing',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MOV videos to WebM format',
      'Web optimized',
      'Modern compression',
      'Open format',
      'Streaming ready',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="mov"
      toFormat={format}
      title={`MOV to ${format.toUpperCase()} Converter`}
      description={`Convert your MOV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/quicktime': ['.mov'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
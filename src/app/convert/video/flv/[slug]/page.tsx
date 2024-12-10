import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'

type TargetFormats = Exclude<VideoFormat, 'flv'>

const validFormats: TargetFormats[] = ['avi', 'mkv', 'mov', 'mp4', 'webm']

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
  const title = `Convert FLV to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert FLV videos to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'FLV converter',
      `FLV to ${formatName}`,
      'Flash video converter',
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
      canonical: `/convert/video/flv/${format}`,
    },
  }
}

export default async function FlvConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts FLV videos to AVI format',
      'Wide device support',
      'Legacy compatibility',
      'Quality preservation',
      'Windows optimized',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts FLV videos to MKV format',
      'Multiple tracks support',
      'Subtitle integration',
      'High quality output',
      'Modern container',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts FLV videos to MOV format',
      'Mac/iOS compatible',
      'Professional format',
      'Quality preservation',
      'Editor friendly',
      'Fast, browser-based conversion',
    ],
    mp4: [
      'Converts FLV videos to MP4 format',
      'Universal playback',
      'Wide compatibility',
      'Efficient compression',
      'Perfect for sharing',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts FLV videos to WebM format',
      'Modern web format',
      'Superior compression',
      'Open standard',
      'Perfect for web',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="flv"
      toFormat={format}
      title={`FLV to ${format.toUpperCase()} Converter`}
      description={`Convert your FLV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/x-flv': ['.flv'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
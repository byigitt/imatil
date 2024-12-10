import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'

type TargetFormats = Exclude<VideoFormat, 'mp4'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mov', 'webm']

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = false
export const fetchCache = 'force-cache'

// Generate metadata for each format
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const format = params.slug as TargetFormats
  
  if (!validFormats.includes(format)) {
    return {
      title: 'Format Not Found',
      description: 'The requested conversion format is not supported.',
    }
  }

  const formatName = format.toUpperCase()
  const title = `Convert MP4 to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert MP4 videos to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'MP4 converter',
      `MP4 to ${formatName}`,
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
      canonical: `/convert/video/mp4/${format}`,
    },
  }
}

type Params = Promise<{ slug: string[] }>;

export default async function Mp4ConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts MP4 videos to AVI format',
      'Legacy format support',
      'Wide compatibility',
      'Maintains quality',
      'Windows friendly',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MP4 videos to FLV format',
      'Flash player support',
      'Web streaming ready',
      'Compact file size',
      'Quick conversion',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MP4 videos to MKV format',
      'Multiple audio tracks',
      'Subtitle support',
      'Lossless quality',
      'Modern container',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts MP4 videos to MOV format',
      'Apple device support',
      'Professional editing',
      'High quality output',
      'Metadata preservation',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MP4 videos to WebM format',
      'Modern web format',
      'Superior compression',
      'Open standard',
      'Perfect for web',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="mp4"
      toFormat={format}
      title={`MP4 to ${format.toUpperCase()} Converter`}
      description={`Convert your MP4 videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/mp4': ['.mp4'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
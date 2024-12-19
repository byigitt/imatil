import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'
import { conversionFeatures } from '@/lib/constants/features'

type TargetFormats = Exclude<VideoFormat, 'webm'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mov', 'mp4']

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
  const title = `Convert WebM to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert WebM videos to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'WebM converter',
      `WebM to ${formatName}`,
      'web video converter',
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
      canonical: `/convert/video/webm/${format}`,
    },
  }
}

export default async function WebmConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = conversionFeatures.webm[format as Exclude<VideoFormat, 'webm'>]

  return (
    <ConverterPage
      fromFormat="webm"
      toFormat={format}
      title={`WebM to ${format.toUpperCase()} Converter`}
      description={`Convert your WebM videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/webm': ['.webm'],
      }}
      features={features}
      type="video"
    />
  )
} 
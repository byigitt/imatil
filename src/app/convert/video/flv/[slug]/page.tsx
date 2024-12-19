import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'
import { conversionFeatures } from '@/lib/constants/features'

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

  const features = conversionFeatures.flv[format as Exclude<VideoFormat, 'flv'>]

  return (
    <ConverterPage
      fromFormat="flv"
      toFormat={format}
      title={`FLV to ${format.toUpperCase()} Converter`}
      description={`Convert your FLV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/x-flv': ['.flv'],
      }}
      features={features}
      type="video"
    />
  )
} 
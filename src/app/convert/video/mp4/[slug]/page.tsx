import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'
import { conversionFeatures } from '@/lib/constants/features'

type TargetFormats = Exclude<VideoFormat, 'mp4'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mov', 'webm']

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

export default async function Mp4ConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = conversionFeatures.mp4[format as Exclude<VideoFormat, 'mp4'>]

  return (
    <ConverterPage
      fromFormat="mp4"
      toFormat={format}
      title={`MP4 to ${format.toUpperCase()} Converter`}
      description={`Convert your MP4 videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/mp4': ['.mp4'],
      }}
      features={features}
      type="video"
    />
  )
} 
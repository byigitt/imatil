import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'
import { conversionFeatures } from '@/lib/constants/features'

type TargetFormats = Exclude<VideoFormat, 'mkv'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mov', 'mp4', 'webm']

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
  const title = `Convert MKV to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert MKV videos to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'MKV converter',
      `MKV to ${formatName}`,
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
      canonical: `/convert/video/mkv/${format}`,
    },
  }
}

export default async function MkvConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = conversionFeatures.mkv[format as Exclude<VideoFormat, 'mkv'>]

  return (
    <ConverterPage
      fromFormat="mkv"
      toFormat={format}
      title={`MKV to ${format.toUpperCase()} Converter`}
      description={`Convert your MKV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/x-matroska': ['.mkv'],
      }}
      features={features}
      type="video"
    />
  )
} 
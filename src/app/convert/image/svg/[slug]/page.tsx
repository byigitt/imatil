import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'
import { conversionFeatures } from '@/lib/constants/features'

type TargetFormats = Exclude<ImageFormat, 'svg'>

const validFormats: TargetFormats[] = ['jpg', 'jpeg', 'png', 'webp']

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
  const title = `Convert SVG to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert SVG images to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'SVG converter',
      `SVG to ${formatName}`,
      'vector to raster',
      'image converter',
      'online converter',
      'free converter',
      'browser-based',
      'no upload',
      'secure conversion',
      format.toLowerCase(),
      'image format',
      'file converter',
      'WebAssembly',
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
      canonical: `/convert/image/svg/${format}`,
    },
  }
}

export default async function SvgConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = conversionFeatures.svg[format as Exclude<ImageFormat, 'svg'>]

  return (
    <ConverterPage
      fromFormat="svg"
      toFormat={format}
      title={`SVG to ${format.toUpperCase()} Converter`}
      description={`Convert your SVG images to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'image/svg+xml': ['.svg'],
      }}
      features={features}
      type="image"
    />
  )
} 
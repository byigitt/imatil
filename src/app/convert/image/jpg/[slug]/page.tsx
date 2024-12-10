import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'

type TargetFormats = Exclude<ImageFormat, 'jpg' | 'jpeg'>

const validFormats: TargetFormats[] = ['png', 'svg', 'webp']

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
  const title = `Convert JPG to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert JPG images to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'JPG converter',
      'JPEG converter',
      `JPG to ${formatName}`,
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
      canonical: `/convert/image/jpg/${format}`,
    },
  }
}

type Params = Promise<{ slug: string[] }>;

export default async function JpgConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats

  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    png: [
      'Converts JPG images to PNG format',
      'Lossless quality',
      'Preserves details',
      'Perfect for editing',
      'High color depth',
      'Fast, browser-based conversion',
    ],
    svg: [
      'Converts JPG images to SVG format',
      'Scalable vectors',
      'Resolution independent',
      'Perfect for logos',
      'Small file size',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts JPG images to WebP format',
      'Modern web format',
      'Superior compression',
      'Better quality',
      'Smaller files',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="jpg"
      toFormat={format}
      title={`JPG to ${format.toUpperCase()} Converter`}
      description={`Convert your JPG images to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'image/jpeg': ['.jpg', '.jpeg'],
      }}
      features={features[format]}
      type="image"
    />
  )
}

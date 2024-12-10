import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'
import type { Metadata } from 'next'

type TargetFormats = Exclude<ImageFormat, 'webp'>

const validFormats: TargetFormats[] = ['jpg', 'jpeg', 'png', 'svg']

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
  const title = `Convert WebP to ${formatName} Online - Free Browser-based Converter`
  const description = `Convert WebP images to ${formatName} format online. Free, fast, and secure browser-based conversion. No upload needed, all processing happens locally.`

  return {
    title,
    description,
    keywords: [
      'WebP converter',
      `WebP to ${formatName}`,
      'modern image format',
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
      canonical: `/convert/image/webp/${format}`,
    },
  }
}

export default async function WebpConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    jpg: [
      'Converts WebP images to JPG format',
      'Universal compatibility',
      'Smaller file size',
      'Perfect for photos',
      'Optimized compression',
      'Fast, browser-based conversion',
    ],
    jpeg: [
      'Converts WebP images to JPEG format',
      'Wide device support',
      'Efficient compression',
      'Great for sharing',
      'High compatibility',
      'Fast, browser-based conversion',
    ],
    png: [
      'Converts WebP images to PNG format',
      'Lossless quality',
      'Preserves transparency',
      'Perfect for graphics',
      'High color depth',
      'Fast, browser-based conversion',
    ],
    svg: [
      'Converts WebP images to SVG format',
      'Scalable vector graphics',
      'Resolution independent',
      'Perfect for logos',
      'Small file size',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="webp"
      toFormat={format}
      title={`WebP to ${format.toUpperCase()} Converter`}
      description={`Convert your WebP images to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'image/webp': ['.webp'],
      }}
      features={features[format]}
      type="image"
    />
  )
} 
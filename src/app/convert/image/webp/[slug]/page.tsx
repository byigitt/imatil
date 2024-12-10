import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<ImageFormat, 'webp'>

const validFormats: TargetFormats[] = ['jpg', 'jpeg', 'png', 'svg']

type Params = Promise<{ slug: string[] }>;

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
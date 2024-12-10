import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<ImageFormat, 'svg'>

const validFormats: TargetFormats[] = ['jpg', 'jpeg', 'png', 'webp']

type Params = Promise<{ slug: string[] }>;

export default async function SvgConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    jpg: [
      'Converts SVG images to JPG format',
      'Raster conversion',
      'Universal support',
      'Perfect for sharing',
      'Optimized quality',
      'Fast, browser-based conversion',
    ],
    jpeg: [
      'Converts SVG images to JPEG format',
      'High compatibility',
      'Efficient compression',
      'Wide device support',
      'Great for web use',
      'Fast, browser-based conversion',
    ],
    png: [
      'Converts SVG images to PNG format',
      'Preserves transparency',
      'Lossless quality',
      'High resolution',
      'Perfect for graphics',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts SVG images to WebP format',
      'Modern web format',
      'Superior compression',
      'Maintains quality',
      'Smaller file size',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="svg"
      toFormat={format}
      title={`SVG to ${format.toUpperCase()} Converter`}
      description={`Convert your SVG images to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'image/svg+xml': ['.svg'],
      }}
      features={features[format]}
      type="image"
    />
  )
} 
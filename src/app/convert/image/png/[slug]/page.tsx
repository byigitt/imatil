import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<ImageFormat, 'png'>

const validFormats: TargetFormats[] = ['jpg', 'jpeg', 'svg', 'webp']

type Params = Promise<{ slug: string[] }>;

export default async function PngConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    jpg: [
      'Converts PNG images to JPG format',
      'Smaller file size',
      'Universal support',
      'Perfect for photos',
      'Efficient compression',
      'Fast, browser-based conversion',
    ],
    jpeg: [
      'Converts PNG images to JPEG format',
      'Wide compatibility',
      'Reduced file size',
      'Great for sharing',
      'High-quality output',
      'Fast, browser-based conversion',
    ],
    svg: [
      'Converts PNG images to SVG format',
      'Scalable vectors',
      'Resolution independent',
      'Perfect for logos',
      'Small file size',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts PNG images to WebP format',
      'Modern web format',
      'Better compression',
      'Maintains quality',
      'Perfect for web',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="png"
      toFormat={format}
      title={`PNG to ${format.toUpperCase()} Converter`}
      description={`Convert your PNG images to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'image/png': ['.png'],
      }}
      features={features[format]}
      type="image"
    />
  )
} 
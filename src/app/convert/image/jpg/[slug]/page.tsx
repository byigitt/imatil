import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { ImageFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<ImageFormat, 'jpg' | 'jpeg'>

const validFormats: TargetFormats[] = ['png', 'svg', 'webp']

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

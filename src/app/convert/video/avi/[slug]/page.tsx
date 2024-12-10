import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<VideoFormat, 'avi'>

const validFormats: TargetFormats[] = ['flv', 'mkv', 'mov', 'mp4', 'webm']

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = false
export const fetchCache = 'force-cache'

type Params = Promise<{ slug: string[] }>;

export default async function AviConverterPage({ params }: { params: Params }) {
  const { slug } = await params
  const format = slug as unknown as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    flv: [
      'Converts AVI videos to FLV format',
      'Optimized for web streaming',
      'Compatible with Flash players',
      'Maintains good quality',
      'Efficient compression',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts AVI videos to MKV format',
      'Supports multiple audio tracks',
      'Preserves video quality',
      'Maintains subtitles',
      'Modern container format',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts AVI videos to MOV format',
      'Perfect for Apple devices',
      'High-quality conversion',
      'Professional video format',
      'Maintains metadata',
      'Fast, browser-based conversion',
    ],
    mp4: [
      'Converts AVI videos to MP4 format',
      'Universal compatibility',
      'Optimized compression',
      'Perfect for sharing',
      'Maintains quality',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts AVI videos to WebM format',
      'Modern web format',
      'Excellent compression',
      'Perfect for web videos',
      'Open-source format',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="avi"
      toFormat={format}
      title={`AVI to ${format.toUpperCase()} Converter`}
      description={`Convert your AVI videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/x-msvideo': ['.avi'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
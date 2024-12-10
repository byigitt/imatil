import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<VideoFormat, 'mov'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mp4', 'webm']

interface Props {
  params: {
    slug: string
  }
}

export default async function MovConverterPage({ params }: Props) {
  const { slug } = await params
  const format = slug as TargetFormats

  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts MOV videos to AVI format',
      'Wide compatibility',
      'Maintains quality',
      'Smaller file size',
      'Windows friendly',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MOV videos to FLV format',
      'Web streaming ready',
      'Flash compatibility',
      'Reduced file size',
      'Quick processing',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MOV videos to MKV format',
      'Multiple audio tracks',
      'Subtitle support',
      'High quality output',
      'Modern container',
      'Fast, browser-based conversion',
    ],
    mp4: [
      'Converts MOV videos to MP4 format',
      'Universal playback',
      'Mobile friendly',
      'Efficient compression',
      'Perfect for sharing',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MOV videos to WebM format',
      'Web optimized',
      'Modern compression',
      'Open format',
      'Streaming ready',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="mov"
      toFormat={format}
      title={`MOV to ${format.toUpperCase()} Converter`}
      description={`Convert your MOV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/quicktime': ['.mov'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
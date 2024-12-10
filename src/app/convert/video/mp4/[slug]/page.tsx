import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<VideoFormat, 'mp4'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mkv', 'mov', 'webm']

interface Props {
  params: {
    slug: string
  }
}

export default async function Mp4ConverterPage({ params }: Props) {
  const { slug } = await params
  const format = slug as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts MP4 videos to AVI format',
      'Legacy format support',
      'Wide compatibility',
      'Maintains quality',
      'Windows friendly',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MP4 videos to FLV format',
      'Flash player support',
      'Web streaming ready',
      'Compact file size',
      'Quick conversion',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MP4 videos to MKV format',
      'Multiple audio tracks',
      'Subtitle support',
      'Lossless quality',
      'Modern container',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts MP4 videos to MOV format',
      'Apple device support',
      'Professional editing',
      'High quality output',
      'Metadata preservation',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MP4 videos to WebM format',
      'Modern web format',
      'Superior compression',
      'Open standard',
      'Perfect for web',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="mp4"
      toFormat={format}
      title={`MP4 to ${format.toUpperCase()} Converter`}
      description={`Convert your MP4 videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/mp4': ['.mp4'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
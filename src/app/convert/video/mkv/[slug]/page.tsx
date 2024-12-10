import { notFound } from 'next/navigation'
import { ConverterPage } from '@/components/converter-page'
import type { VideoFormat } from '@/lib/ffmpeg/types'

type TargetFormats = Exclude<VideoFormat, 'mkv'>

const validFormats: TargetFormats[] = ['avi', 'flv', 'mov', 'mp4', 'webm']

interface Props {
  params: {
    slug: string
  }
}

export default async function MkvConverterPage({ params }: Props) {
  const { slug } = await params
  const format = slug as TargetFormats
  
  if (!validFormats.includes(format)) {
    notFound()
  }

  const features = {
    avi: [
      'Converts MKV videos to AVI format',
      'Wide device compatibility',
      'Maintains video quality',
      'Preserves audio tracks',
      'Efficient conversion',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MKV videos to FLV format',
      'Perfect for web streaming',
      'Reduced file size',
      'Flash player support',
      'Quick processing',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts MKV videos to MOV format',
      'Mac and iOS compatibility',
      'Professional video format',
      'High-quality output',
      'Preserves metadata',
      'Fast, browser-based conversion',
    ],
    mp4: [
      'Converts MKV videos to MP4 format',
      'Universal compatibility',
      'Maintains high quality',
      'Efficient compression',
      'Perfect for sharing',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MKV videos to WebM format',
      'Modern web format',
      'Excellent compression',
      'Open-source standard',
      'Perfect for streaming',
      'Fast, browser-based conversion',
    ],
  } satisfies Record<TargetFormats, string[]>

  return (
    <ConverterPage
      fromFormat="mkv"
      toFormat={format}
      title={`MKV to ${format.toUpperCase()} Converter`}
      description={`Convert your MKV videos to ${format.toUpperCase()} format with high quality`}
      acceptTypes={{
        'video/x-matroska': ['.mkv'],
      }}
      features={features[format]}
      type="video"
    />
  )
} 
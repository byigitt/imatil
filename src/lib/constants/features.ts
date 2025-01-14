import { ImageFormat, VideoFormat } from '@/lib/ffmpeg/types'

type Features = {
  [K in VideoFormat | ImageFormat]: {
    [T in Exclude<VideoFormat | ImageFormat, K>]?: string[]
  }
}

export const conversionFeatures: Features = {
  mp4: {
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
      'Browser-based processing',
    ],
    webm: [
      'Converts MP4 videos to WebM format',
      'Modern web standard',
      'HTML5 compatible',
      'Efficient compression',
      'Open-source format',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts MP4 videos to MOV format',
      'Apple device optimized',
      'High quality output',
      'Professional editing ready',
      'Maintains metadata',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MP4 videos to MKV format',
      'Container flexibility',
      'Multiple track support',
      'High quality retention',
      'Chapter support',
      'Fast, browser-based conversion',
    ],
  },
  webm: {
    avi: [
      'Converts WebM videos to AVI format',
      'Wide device support',
      'Legacy compatibility',
      'Quality preservation',
      'Windows optimized',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts WebM videos to FLV format',
      'Flash compatibility',
      'Streaming support',
      'Reduced file size',
      'Quick processing',
      'Browser-based conversion',
    ],
    mp4: [
      'Converts WebM videos to MP4 format',
      'Universal compatibility',
      'Mobile device ready',
      'Streaming optimized',
      'Quality retention',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts WebM videos to MOV format',
      'Mac compatibility',
      'Professional quality',
      'Editing software ready',
      'Metadata preservation',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts WebM videos to MKV format',
      'Multiple tracks support',
      'Flexible container',
      'High quality output',
      'Chapter enabled',
      'Fast, browser-based conversion',
    ],
  },
  mov: {
    mp4: [
      'Converts MOV videos to MP4 format',
      'Universal playback',
      'Mobile-friendly',
      'Streaming optimized',
      'Quality preservation',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MOV videos to WebM format',
      'Web-optimized',
      'Modern compression',
      'Open format',
      'HTML5 ready',
      'Fast, browser-based conversion',
    ],
    avi: [
      'Converts MOV videos to AVI format',
      'Wide compatibility',
      'Legacy support',
      'Windows friendly',
      'Quality retention',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MOV videos to FLV format',
      'Flash video ready',
      'Streaming support',
      'Compact size',
      'Quick processing',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts MOV videos to MKV format',
      'Advanced container',
      'Multiple tracks',
      'Chapter support',
      'High quality',
      'Fast, browser-based conversion',
    ],
  },
  mkv: {
    mp4: [
      'Converts MKV videos to MP4 format',
      'Universal support',
      'Mobile compatible',
      'Streaming ready',
      'Quality retention',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts MKV videos to WebM format',
      'Web standard',
      'Modern codec',
      'Efficient size',
      'HTML5 compatible',
      'Fast, browser-based conversion',
    ],
    avi: [
      'Converts MKV videos to AVI format',
      'Legacy support',
      'Wide compatibility',
      'Windows optimized',
      'Quality preservation',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts MKV videos to FLV format',
      'Flash ready',
      'Stream friendly',
      'Compact output',
      'Quick conversion',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts MKV videos to MOV format',
      'Apple compatible',
      'Professional editing',
      'High quality',
      'Metadata support',
      'Fast, browser-based conversion',
    ],
  },
  flv: {
    mp4: [
      'Converts FLV videos to MP4 format',
      'Modern format',
      'Wide support',
      'Mobile ready',
      'Quality upgrade',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts FLV videos to WebM format',
      'Web optimized',
      'Modern codec',
      'Efficient compression',
      'HTML5 ready',
      'Fast, browser-based conversion',
    ],
    avi: [
      'Converts FLV videos to AVI format',
      'Legacy support',
      'Wide compatibility',
      'Windows friendly',
      'Quality retention',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts FLV videos to MOV format',
      'Apple compatible',
      'Professional quality',
      'Editor ready',
      'Metadata support',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts FLV videos to MKV format',
      'Advanced container',
      'Multiple tracks',
      'High quality',
      'Chapter support',
      'Fast, browser-based conversion',
    ],
  },
  avi: {
    mp4: [
      'Converts AVI videos to MP4 format',
      'Modern format',
      'Universal support',
      'Mobile ready',
      'Quality preservation',
      'Fast, browser-based conversion',
    ],
    webm: [
      'Converts AVI videos to WebM format',
      'Web standard',
      'Modern codec',
      'Efficient size',
      'HTML5 compatible',
      'Fast, browser-based conversion',
    ],
    flv: [
      'Converts AVI videos to FLV format',
      'Flash compatible',
      'Stream ready',
      'Compact size',
      'Quick processing',
      'Fast, browser-based conversion',
    ],
    mov: [
      'Converts AVI videos to MOV format',
      'Mac compatible',
      'Professional quality',
      'Editor friendly',
      'Metadata support',
      'Fast, browser-based conversion',
    ],
    mkv: [
      'Converts AVI videos to MKV format',
      'Modern container',
      'Multiple tracks',
      'High quality',
      'Chapter support',
      'Fast, browser-based conversion',
    ],
  },
  jpg: {
    png: [
      'Converts JPG images to PNG format',
      'Lossless quality',
      'Transparency support',
      'Web-optimized',
      'Professional graphics ready',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts JPG images to WebP format',
      'Modern web format',
      'Smaller file size',
      'Quality preservation',
      'Fast loading',
      'Browser-based processing',
    ],
    svg: [
      'Converts JPG images to SVG format',
      'Vector graphics',
      'Infinite scalability',
      'Small file size',
      'Web-friendly',
      'Fast, browser-based conversion',
    ],
  },
  jpeg: {
    png: [
      'Converts JPEG images to PNG format',
      'Lossless quality',
      'Transparency support',
      'Web-optimized',
      'Professional graphics ready',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts JPEG images to WebP format',
      'Modern web format',
      'Smaller file size',
      'Quality preservation',
      'Fast loading',
      'Browser-based processing',
    ],
    svg: [
      'Converts JPEG images to SVG format',
      'Vector graphics',
      'Infinite scalability',
      'Small file size',
      'Web-friendly',
      'Fast, browser-based conversion',
    ],
  },
  png: {
    jpg: [
      'Converts PNG images to JPG format',
      'Universal compatibility',
      'Smaller file size',
      'Photography optimized',
      'Web-ready',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts PNG images to WebP format',
      'Modern web format',
      'Efficient compression',
      'Quality retention',
      'Fast loading',
      'Browser-based processing',
    ],
    svg: [
      'Converts PNG images to SVG format',
      'Vector output',
      'Infinite scaling',
      'Web-optimized',
      'Small file size',
      'Fast, browser-based conversion',
    ],
  },
  webp: {
    jpg: [
      'Converts WebP images to JPG format',
      'Universal support',
      'Photography ready',
      'Editor friendly',
      'Quality preservation',
      'Fast, browser-based conversion',
    ],
    png: [
      'Converts WebP images to PNG format',
      'Lossless quality',
      'Transparency support',
      'Professional graphics',
      'Editor compatible',
      'Fast, browser-based conversion',
    ],
    svg: [
      'Converts WebP images to SVG format',
      'Vector graphics',
      'Scalable output',
      'Web-optimized',
      'Small size',
      'Fast, browser-based conversion',
    ],
  },
  svg: {
    jpg: [
      'Converts SVG images to JPG format',
      'Universal compatibility',
      'Photography ready',
      'Web-optimized',
      'Editor friendly',
      'Fast, browser-based conversion',
    ],
    png: [
      'Converts SVG images to PNG format',
      'Lossless rasterization',
      'Transparency support',
      'Professional quality',
      'Editor ready',
      'Fast, browser-based conversion',
    ],
    webp: [
      'Converts SVG images to WebP format',
      'Modern web format',
      'Efficient compression',
      'Quality preservation',
      'Fast loading',
      'Browser-based processing',
    ],
  },
} 
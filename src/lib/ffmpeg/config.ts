import type { FormatConfig, ConversionPreset, VideoFormat, ImageFormat, MediaFormat } from './types'

export const FORMAT_CONFIGS: Record<MediaFormat, FormatConfig> = {
  // Video formats
  mp4: {
    mimeType: 'video/mp4',
    extension: '.mp4',
    type: 'video',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    extraFlags: ['-movflags', '+faststart'],
  },
  webm: {
    mimeType: 'video/webm',
    extension: '.webm',
    type: 'video',
    videoCodec: 'libvpx-vp9',
    audioCodec: 'libopus',
    extraFlags: [],
  },
  mov: {
    mimeType: 'video/quicktime',
    extension: '.mov',
    type: 'video',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    extraFlags: [
      '-movflags', '+faststart',
      '-pix_fmt', 'yuv420p',
    ],
  },
  avi: {
    mimeType: 'video/x-msvideo',
    extension: '.avi',
    type: 'video',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    extraFlags: [
      '-pix_fmt', 'yuv420p',
      '-vtag', 'XVID',
    ],
  },
  flv: {
    mimeType: 'video/x-flv',
    extension: '.flv',
    type: 'video',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    extraFlags: [
      '-pix_fmt', 'yuv420p',
      '-f', 'flv',
      '-flvflags', 'aac_seq_header_detect',
    ],
  },
  mkv: {
    mimeType: 'video/x-matroska',
    extension: '.mkv',
    type: 'video',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    extraFlags: [
      '-pix_fmt', 'yuv420p',
      '-map', '0',  // Include all streams
      '-c:s', 'copy', // Copy subtitles if present
    ],
  },
  // Image formats
  png: {
    mimeType: 'image/png',
    extension: '.png',
    type: 'image',
    extraFlags: ['-compression_level', '9'],
  },
  jpg: {
    mimeType: 'image/jpeg',
    extension: '.jpg',
    type: 'image',
    extraFlags: ['-qmin', '1', '-qmax', '100'],
  },
  jpeg: {
    mimeType: 'image/jpeg',
    extension: '.jpeg',
    type: 'image',
    extraFlags: ['-qmin', '1', '-qmax', '100'],
  },
  webp: {
    mimeType: 'image/webp',
    extension: '.webp',
    type: 'image',
    extraFlags: ['-lossless', '0', '-quality', '90', '-compression_level', '6'],
  },
  svg: {
    mimeType: 'image/svg+xml',
    extension: '.svg',
    type: 'image',
    extraFlags: [],
  },
} as const

export const CONVERSION_PRESETS: ConversionPreset = {
  quality: {
    low: { crf: '28', scale: 'iw*0.5:-2' },
    medium: { crf: '23', scale: 'iw:-2' },
    high: { crf: '18', scale: 'iw:-2' },
  },
  speed: {
    fast: { preset: 'ultrafast', threads: 'auto' },
    medium: { preset: 'medium', threads: 'auto' },
    slow: { preset: 'slow', threads: 'auto' },
  },
} as const

// Define supported image conversions
const IMAGE_CONVERSIONS = [
  // PNG conversions
  { from: 'png', to: 'jpg' },
  { from: 'png', to: 'jpeg' },
  { from: 'png', to: 'webp' },
  { from: 'png', to: 'svg' },
  // JPG/JPEG conversions
  { from: 'jpg', to: 'png' },
  { from: 'jpg', to: 'webp' },
  { from: 'jpg', to: 'svg' },
  { from: 'jpeg', to: 'png' },
  { from: 'jpeg', to: 'webp' },
  { from: 'jpeg', to: 'svg' },
  // WebP conversions
  { from: 'webp', to: 'png' },
  { from: 'webp', to: 'jpg' },
  { from: 'webp', to: 'jpeg' },
  { from: 'webp', to: 'svg' },
  // SVG conversions
  { from: 'svg', to: 'png' },
  { from: 'svg', to: 'jpg' },
  { from: 'svg', to: 'jpeg' },
  { from: 'svg', to: 'webp' },
] as const

// Define video conversions with MKV
const VIDEO_CONVERSIONS = [
  // MP4 conversions
  { from: 'mp4', to: 'webm' },
  { from: 'mp4', to: 'mov' },
  { from: 'mp4', to: 'avi' },
  { from: 'mp4', to: 'flv' },
  { from: 'mp4', to: 'mkv' },
  // WebM conversions
  { from: 'webm', to: 'mp4' },
  { from: 'webm', to: 'mov' },
  { from: 'webm', to: 'avi' },
  { from: 'webm', to: 'flv' },
  { from: 'webm', to: 'mkv' },
  // MOV conversions
  { from: 'mov', to: 'mp4' },
  { from: 'mov', to: 'webm' },
  { from: 'mov', to: 'avi' },
  { from: 'mov', to: 'flv' },
  { from: 'mov', to: 'mkv' },
  // AVI conversions
  { from: 'avi', to: 'mp4' },
  { from: 'avi', to: 'webm' },
  { from: 'avi', to: 'mov' },
  { from: 'avi', to: 'flv' },
  { from: 'avi', to: 'mkv' },
  // FLV conversions
  { from: 'flv', to: 'mp4' },
  { from: 'flv', to: 'webm' },
  { from: 'flv', to: 'mov' },
  { from: 'flv', to: 'avi' },
  { from: 'flv', to: 'mkv' },
  // MKV conversions
  { from: 'mkv', to: 'mp4' },
  { from: 'mkv', to: 'webm' },
  { from: 'mkv', to: 'mov' },
  { from: 'mkv', to: 'avi' },
  { from: 'mkv', to: 'flv' },
] as const

// Combine video and image conversions
export const SUPPORTED_CONVERSIONS = [
  ...VIDEO_CONVERSIONS,
  ...IMAGE_CONVERSIONS,
] as const

export function isFormatSupported(format: string): format is MediaFormat {
  return format in FORMAT_CONFIGS
}

export function getFormatConfig(format: MediaFormat): FormatConfig {
  return FORMAT_CONFIGS[format]
}

export function getMimeType(format: MediaFormat): string {
  return FORMAT_CONFIGS[format].mimeType
}

export function getExtension(format: MediaFormat): string {
  return FORMAT_CONFIGS[format].extension
}

export function isConversionSupported(from: string, to: string): boolean {
  return SUPPORTED_CONVERSIONS.some(
    (conversion) => conversion.from === from && conversion.to === to
  )
}

export function isImageFormat(format: string): format is ImageFormat {
  return format in FORMAT_CONFIGS && FORMAT_CONFIGS[format as MediaFormat].type === 'image'
}

export function isVideoFormat(format: string): format is VideoFormat {
  return format in FORMAT_CONFIGS && FORMAT_CONFIGS[format as MediaFormat].type === 'video'
} 
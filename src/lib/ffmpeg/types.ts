import type { FFmpeg } from '@ffmpeg/ffmpeg'

export type VideoFormat = 'mp4' | 'webm' | 'mov' | 'avi' | 'flv' | 'mkv'
export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'svg'
export type MediaFormat = VideoFormat | ImageFormat

export interface ConversionProgress {
  ratio: number
  time: number
}

export interface ConversionOptions {
  quality?: 'low' | 'medium' | 'high'
  speed?: 'fast' | 'medium' | 'slow'
}

export interface ImageConversionOptions extends ConversionOptions {
  width?: number
  height?: number
  maintainAspectRatio?: boolean
}

export interface FormatConfig {
  mimeType: string
  extension: string
  type: 'video' | 'image'
  videoCodec?: string
  audioCodec?: string
  extraFlags?: string[]
}

export interface ConversionPreset {
  quality: {
    low: { crf: string; scale: string }
    medium: { crf: string; scale: string }
    high: { crf: string; scale: string }
  }
  speed: {
    fast: { preset: string; threads: string }
    medium: { preset: string; threads: string }
    slow: { preset: string; threads: string }
  }
}

export interface ConversionResult {
  blob: Blob
  fileName: string
}

export type ConversionFunction = (
  ffmpeg: FFmpeg,
  inputFile: File,
  onProgress?: (progress: ConversionProgress) => void,
  options?: ConversionOptions | ImageConversionOptions
) => Promise<ConversionResult> 
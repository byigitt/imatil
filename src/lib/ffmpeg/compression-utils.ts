import type { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

export interface ConversionProgress {
  ratio: number
  time: number
}

export interface ConversionOptions {
  quality?: 'low' | 'medium' | 'high'
  speed?: 'fast' | 'medium' | 'slow'
}

const QUALITY_PRESETS = {
  low: { crf: '28', scale: 'iw*0.5:-2' },
  medium: { crf: '23', scale: 'iw:-2' },
  high: { crf: '18', scale: 'iw:-2' },
}

const SPEED_PRESETS = {
  fast: { preset: 'ultrafast', threads: 'auto' },
  medium: { preset: 'medium', threads: 'auto' },
  slow: { preset: 'slow', threads: 'auto' },
}

export async function convertWebmToMp4(
  ffmpeg: FFmpeg,
  inputFile: File,
  onProgress?: (progress: ConversionProgress) => void,
  options: ConversionOptions = { quality: 'medium', speed: 'fast' }
): Promise<Blob> {
  try {
    const inputFileName = 'input.webm'
    const outputFileName = 'output.mp4'
    
    ffmpeg.on('progress', (progress) => {
      onProgress?.({
        ratio: progress.progress,
        time: progress.time
      })
    })

    await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile))

    const quality = QUALITY_PRESETS[options.quality ?? 'medium']
    const speed = SPEED_PRESETS[options.speed ?? 'fast']

    await ffmpeg.exec([
      '-i', inputFileName,
      '-c:v', 'libx264',
      '-preset', speed.preset,
      '-crf', quality.crf,
      '-vf', `scale=${quality.scale}`,
      '-threads', speed.threads,
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-y',
      outputFileName
    ])

    const data = await ffmpeg.readFile(outputFileName)
    
    await ffmpeg.deleteFile(inputFileName)
    await ffmpeg.deleteFile(outputFileName)

    return new Blob([data], { type: 'video/mp4' })
  } catch (error) {
    console.error('Error during conversion:', error)
    throw new Error('Failed to convert video')
  }
}

export async function convertMp4ToWebm(
  ffmpeg: FFmpeg,
  inputFile: File,
  onProgress?: (progress: ConversionProgress) => void,
  options: ConversionOptions = { quality: 'medium', speed: 'fast' }
): Promise<Blob> {
  try {
    const inputFileName = 'input.mp4'
    const outputFileName = 'output.webm'
    
    ffmpeg.on('progress', (progress) => {
      onProgress?.({
        ratio: progress.progress,
        time: progress.time
      })
    })

    await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile))

    const quality = QUALITY_PRESETS[options.quality ?? 'medium']
    const speed = SPEED_PRESETS[options.speed ?? 'fast']

    await ffmpeg.exec([
      '-i', inputFileName,
      '-c:v', 'libvpx-vp9',
      '-cpu-used', speed.preset === 'ultrafast' ? '8' : speed.preset === 'medium' ? '4' : '0',
      '-crf', quality.crf,
      '-vf', `scale=${quality.scale}`,
      '-threads', speed.threads,
      '-c:a', 'libopus',
      '-b:a', '128k',
      '-y',
      outputFileName
    ])

    const data = await ffmpeg.readFile(outputFileName)
    
    await ffmpeg.deleteFile(inputFileName)
    await ffmpeg.deleteFile(outputFileName)

    return new Blob([data], { type: 'video/webm' })
  } catch (error) {
    console.error('Error during conversion:', error)
    throw new Error('Failed to convert video')
  }
}

export function isWebmFile(file: File): boolean {
  return file.type === 'video/webm'
}

export function isMp4File(file: File): boolean {
  return file.type === 'video/mp4'
}

export function generateOutputFileName(inputFileName: string, targetFormat: 'mp4' | 'webm'): string {
  return inputFileName.replace(/\.(webm|mp4)$/i, `.${targetFormat}`)
} 
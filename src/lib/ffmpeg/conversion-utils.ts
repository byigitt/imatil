// TODO: Video conversion is working but image conversion is not.

import type { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import type {
  ConversionProgress,
  ConversionOptions,
  ImageConversionOptions,
  MediaFormat,
  ConversionResult,
  FormatConfig,
} from './types'
import {
  FORMAT_CONFIGS,
  CONVERSION_PRESETS,
  getFormatConfig,
  isImageFormat,
  isVideoFormat,
} from './config'

function assertVideoConfig(config: FormatConfig): asserts config is FormatConfig & { videoCodec: string; audioCodec: string } {
  if (!config.videoCodec || !config.audioCodec) {
    throw new Error('Invalid video format configuration')
  }
}

function getImageQualitySettings(format: MediaFormat, quality: NonNullable<ImageConversionOptions['quality']>) {
  console.log(`Getting quality settings for ${format} with quality level: ${quality}`)
  switch (format) {
    case 'jpg':
    case 'jpeg':
      return quality === 'low' ? '15' : quality === 'medium' ? '5' : '2'
    case 'webp':
      return quality === 'low' ? '50' : quality === 'medium' ? '75' : '90'
    case 'png':
      return quality === 'low' ? '3' : quality === 'medium' ? '6' : '9'
    default:
      return '75'
  }
}

function generateSafeFileName(originalName: string, extension: string): string {
  console.log(`Generating safe file name for: ${originalName} with extension: ${extension}`)
  const safeName = originalName
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '')
    .substring(0, 32)
  const result = `${safeName}${extension}`
  console.log(`Generated safe file name: ${result}`)
  return result
}

async function cleanupFiles(ffmpeg: FFmpeg, files: string[]) {
  console.log('Starting file cleanup for:', files)
  for (const file of files) {
    try {
      console.log(`Checking if file exists: ${file}`)
      const fileList = await ffmpeg.listDir('/')
      console.log('Current files in directory:', fileList.map(f => f.name))
      
      const fileExists = fileList.some(f => f.name === file)
      if (fileExists) {
        console.log(`Deleting file: ${file}`)
        await ffmpeg.deleteFile(file)
        console.log(`Successfully deleted file: ${file}`)
      } else {
        console.log(`File not found, skipping deletion: ${file}`)
      }
    } catch (error) {
      console.warn(`Failed to delete file ${file}:`, error)
    }
  }
  console.log('File cleanup completed')
}

function convertToUint8Array(data: string | Uint8Array): Uint8Array {
  console.log(`Converting data to Uint8Array, type: ${typeof data}`)
  if (data instanceof Uint8Array) {
    console.log('Data is already Uint8Array')
    return data
  }
  console.log('Converting string to Uint8Array')
  const encoder = new TextEncoder()
  return encoder.encode(data)
}

export async function convertMedia(
  ffmpeg: FFmpeg,
  inputFile: File,
  fromFormat: MediaFormat,
  toFormat: MediaFormat,
  onProgress?: (progress: ConversionProgress) => void,
  options: ConversionOptions | ImageConversionOptions = { quality: 'medium', speed: 'fast' }
): Promise<ConversionResult> {
  console.log(`Starting conversion from ${fromFormat} to ${toFormat}`)
  console.log('Input file:', { name: inputFile.name, size: inputFile.size, type: inputFile.type })
  console.log('Conversion options:', options)

  const inputConfig = getFormatConfig(fromFormat)
  const outputConfig = getFormatConfig(toFormat)
  
  const fileBaseName = inputFile.name.replace(/\.[^/.]+$/, '')
  const inputFileName = generateSafeFileName(fileBaseName, inputConfig.extension)
  const outputFileName = generateSafeFileName(fileBaseName, outputConfig.extension)
  const filesToCleanup = [inputFileName, outputFileName]
  
  console.log('File names:', { input: inputFileName, output: outputFileName })
  
  try {
    if (isImageFormat(fromFormat) && isImageFormat(toFormat)) {
      console.log('Starting image conversion')
      onProgress?.({ ratio: 0.1, time: 0 })
    }
    
    ffmpeg.on('progress', (progress) => {
      console.log('Conversion progress:', progress)
      onProgress?.({
        ratio: progress.progress,
        time: progress.time
      })
    })

    console.log('Writing input file...')
    try {
      const fileData = await fetchFile(inputFile)
      console.log('Input file data fetched:', {
        size: fileData.byteLength,
        type: inputFile.type,
        name: inputFile.name
      })
      
      await ffmpeg.writeFile(inputFileName, fileData)
      console.log('Input file written successfully')
      
      // Verify input file exists
      const filesAfterWrite = await ffmpeg.listDir('/')
      console.log('Files after writing input:', filesAfterWrite.map(f => f.name))
    } catch (error) {
      console.error('Error writing input file:', error)
      throw new Error('Failed to process input file')
    }

    console.log('Building FFmpeg command...')
    let command: string[] = []

    // Add input file
    command.push('-i', inputFileName)

    if (isVideoFormat(fromFormat) && isVideoFormat(toFormat)) {
      console.log('Configuring video conversion...')
      assertVideoConfig(outputConfig)
      
      const quality = CONVERSION_PRESETS.quality[options.quality ?? 'medium']
      const speed = CONVERSION_PRESETS.speed[options.speed ?? 'fast']

      command.push('-c:v', outputConfig.videoCodec)

      if (outputConfig.videoCodec === 'libx264') {
        command.push('-preset', speed.preset)
      } else if (outputConfig.videoCodec === 'libvpx-vp9') {
        command.push('-cpu-used', speed.preset === 'ultrafast' ? '8' : speed.preset === 'medium' ? '4' : '0')
      }

      command.push(
        '-crf', quality.crf,
        '-vf', `scale=${quality.scale}`,
        '-threads', speed.threads,
        '-c:a', outputConfig.audioCodec,
        '-b:a', '128k',
      )
    } else if (isImageFormat(fromFormat) && isImageFormat(toFormat)) {
      console.log('Configuring image conversion...')
      const imgOptions = options as ImageConversionOptions
      const quality = getImageQualitySettings(toFormat, imgOptions.quality ?? 'medium')

      if (toFormat === 'jpg' || toFormat === 'jpeg') {
        console.log('Applying JPEG settings')
        command.push(
          '-i', inputFileName,
          '-c:v', 'mjpeg',
          '-q:v', quality,
          '-frames:v', '1',
        )
      } else if (toFormat === 'webp') {
        console.log('Applying WebP settings')
        command.push(
          '-i', inputFileName,
          '-c:v', 'libwebp',
          '-quality', quality,
          '-frames:v', '1',
        )
      } else if (toFormat === 'png') {
        console.log('Applying PNG settings')
        command.push(
          '-i', inputFileName,
          '-c:v', 'png',
          '-compression_level', quality,
          '-frames:v', '1',
        )
      }

      // Remove any additional format-specific flags for simplicity
      if (outputConfig.extraFlags) {
        console.log('Skipping extra flags for image conversion')
      }
    } else {
      throw new Error('Unsupported conversion between different media types')
    }

    command.push('-y', outputFileName)
    console.log('Final FFmpeg command:', command)

    console.log('Executing FFmpeg command...')
    try {
      ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg log:', message)
      })

      // Set memory limit before executing command
      await ffmpeg.exec(['-memory_limit', '2048M'])
      
      // Execute the conversion command
      await ffmpeg.exec(command)
      console.log('FFmpeg command executed successfully')

      // Verify the output file exists and has content
      const files = await ffmpeg.listDir('/')
      const outputFile = files.find(f => f.name === outputFileName)
      
      if (!outputFile) {
        throw new Error('Output file was not created')
      }

      // Read the file to verify it has content
      const fileData = await ffmpeg.readFile(outputFileName)
      if (!fileData || (fileData instanceof Uint8Array && fileData.length === 0)) {
        throw new Error('Output file is empty')
      }
    } catch (error) {
      console.error('FFmpeg execution error:', error)
      await cleanupFiles(ffmpeg, filesToCleanup)
      throw new Error('Failed to convert file')
    }

    if (isImageFormat(fromFormat) && isImageFormat(toFormat)) {
      console.log('Image conversion completed')
      onProgress?.({ ratio: 1, time: 0 })
    }

    console.log('Reading output file...')
    let outputData: Uint8Array
    try {
      const fileData = await ffmpeg.readFile(outputFileName)
      outputData = convertToUint8Array(fileData)
      console.log('Output file read successfully')
    } catch (error) {
      console.error('Error reading output file:', error)
      await cleanupFiles(ffmpeg, filesToCleanup)
      throw new Error('Failed to read converted file')
    }

    console.log('Cleaning up files...')
    await cleanupFiles(ffmpeg, filesToCleanup)

    console.log('Conversion completed successfully')
    return {
      blob: new Blob([outputData], { type: outputConfig.mimeType }),
      fileName: `${fileBaseName}${outputConfig.extension}`
    }
  } catch (error) {
    console.error('Conversion failed:', error)
    await cleanupFiles(ffmpeg, filesToCleanup)

    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to convert media')
  }
}

export function getFileFormat(file: File): MediaFormat | null {
  console.log('Getting file format for:', { name: file.name, type: file.type })
  for (const [format, config] of Object.entries(FORMAT_CONFIGS)) {
    if (file.type === config.mimeType) {
      console.log(`Detected format: ${format}`)
      return format as MediaFormat
    }
  }
  console.log('No matching format found')
  return null
}

export function generateOutputFileName(inputFileName: string, format: MediaFormat): string {
  console.log(`Generating output file name for ${inputFileName} with format ${format}`)
  const config = getFormatConfig(format)
  const result = inputFileName.replace(/\.[^/.]+$/, config.extension)
  console.log(`Generated output file name: ${result}`)
  return result
} 
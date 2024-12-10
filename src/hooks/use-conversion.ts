import { useState, useCallback, useEffect } from 'react'
import { getFFmpeg } from '@/lib/ffmpeg/ffmpeg-init'
import type { ConversionProgress, ConversionOptions, MediaFormat } from '@/lib/ffmpeg/types'
import { convertMedia } from '@/lib/ffmpeg/conversion-utils'

interface UseConversionProps {
  fromFormat: MediaFormat
  toFormat: MediaFormat
  acceptTypes: Record<string, string[]>
}

export function useConversion({ fromFormat, toFormat, acceptTypes }: UseConversionProps) {
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const initFFmpeg = async () => {
      try {
        await getFFmpeg()
        if (mounted) {
          setIsReady(true)
        }
      } catch (error) {
        if (mounted) {
          setError(error instanceof Error ? error.message : 'Failed to load FFmpeg')
        }
      }
    }

    initFFmpeg()

    return () => {
      mounted = false
    }
  }, [])

  const handleFileSelect = useCallback(async (
    file: File,
    options: ConversionOptions = { quality: 'medium', speed: 'fast' }
  ) => {
    if (!isReady) {
      setError('FFmpeg is not ready yet')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const ffmpeg = await getFFmpeg()
      setIsConverting(true)
      setIsLoading(false)

      const result = await convertMedia(
        ffmpeg,
        file,
        fromFormat,
        toFormat,
        (progress: ConversionProgress) => {
          setProgress(progress.ratio * 100)
        },
        options
      )

      setIsConverting(false)
      setProgress(100)

      // Create download link
      const url = URL.createObjectURL(result.blob)
      const a = document.createElement('a')
      a.href = url
      a.download = result.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      return url
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to convert media')
      return null
    } finally {
      setIsLoading(false)
      setIsConverting(false)
    }
  }, [isReady, fromFormat, toFormat])
  
  const reset = useCallback(() => {
    setIsConverting(false)
    setProgress(0)
    setError(null)
  }, [])

  return {
    isReady,
    isLoading,
    isConverting,
    progress,
    error,
    handleFileSelect,
    reset,
  }
} 
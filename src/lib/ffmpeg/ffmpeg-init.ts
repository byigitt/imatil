import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

interface FFmpegError extends Error {
  name: string;
  message: string;
  stack?: string;
}

let ffmpeg: FFmpeg | null = null
let loadingPromise: Promise<FFmpeg> | null = null

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg?.loaded) {
    console.log('FFmpeg instance already loaded and ready')
    return ffmpeg
  }

  if (loadingPromise) {
    console.log('FFmpeg is currently loading, waiting...')
    return loadingPromise
  }

  console.log('Creating new FFmpeg instance...')
  ffmpeg = new FFmpeg()
  
  loadingPromise = (async () => {
    try {
      console.log('Loading FFmpeg...')
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      
      console.log('Fetching core.js...')
      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript')
      
      console.log('Fetching core.wasm...')
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
      
      console.log('Loading FFmpeg with core files...')
      await ffmpeg!.load({
        coreURL,
        wasmURL,
      })
      
      console.log('FFmpeg loaded successfully!')
      return ffmpeg!
    } catch (error) {
      ffmpeg = null
      loadingPromise = null
      console.error('FFmpeg loading error:', error)
      throw error
    }
  })()

  return loadingPromise
}

export function isFFmpegLoaded(): boolean {
  return ffmpeg?.loaded ?? false
}

export function disposeFFmpeg(): void {
  if (ffmpeg) {
    console.log('Disposing FFmpeg instance...')
    ffmpeg.terminate()
    ffmpeg = null
    loadingPromise = null
  }
}
import { MetadataRoute } from 'next'
import type { ImageFormat, VideoFormat } from '@/lib/ffmpeg/types'

const BASE_URL = 'https://i.baris.pw'

// Image formats
const imageFormats: ImageFormat[] = ['jpg', 'jpeg', 'png', 'svg', 'webp']
const imageTargets: Record<ImageFormat, ImageFormat[]> = {
  jpg: ['png', 'svg', 'webp'],
  jpeg: ['png', 'svg', 'webp'],
  png: ['jpg', 'jpeg', 'svg', 'webp'],
  svg: ['jpg', 'jpeg', 'png', 'webp'],
  webp: ['jpg', 'jpeg', 'png', 'svg'],
}

// Video formats
const videoFormats: VideoFormat[] = ['avi', 'flv', 'mkv', 'mov', 'mp4', 'webm']
const videoTargets: Record<VideoFormat, VideoFormat[]> = {
  avi: ['flv', 'mkv', 'mov', 'mp4', 'webm'],
  flv: ['avi', 'mkv', 'mov', 'mp4', 'webm'],
  mkv: ['avi', 'flv', 'mov', 'mp4', 'webm'],
  mov: ['avi', 'flv', 'mkv', 'mp4', 'webm'],
  mp4: ['avi', 'flv', 'mkv', 'mov', 'webm'],
  webm: ['avi', 'flv', 'mkv', 'mov', 'mp4'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Add image converter routes
  for (const fromFormat of imageFormats) {
    const targets = imageTargets[fromFormat] || []
    for (const toFormat of targets) {
      routes.push({
        url: `${BASE_URL}/convert/image/${fromFormat}/${toFormat}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })
    }
  }

  // Add video converter routes
  for (const fromFormat of videoFormats) {
    const targets = videoTargets[fromFormat] || []
    for (const toFormat of targets) {
      routes.push({
        url: `${BASE_URL}/convert/video/${fromFormat}/${toFormat}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })
    }
  }

  return routes
} 
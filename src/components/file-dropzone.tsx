'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileVideo, Loader2, UploadCloud, Image } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
  isConverting?: boolean
  accept?: Record<string, string[]>
  errorMessage?: string | null
  type?: 'video' | 'image'
}

export function FileDropzone({
  onFileSelect,
  isLoading = false,
  isConverting = false,
  accept = {
    'video/webm': ['.webm'],
  },
  errorMessage,
  type = 'video',
}: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  const isDisabled = isLoading || isConverting

  const FileIcon = type === 'video' ? FileVideo : Image

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'relative overflow-hidden border-2 border-dashed transition-colors duration-200 hover:cursor-pointer hover:border-primary/50',
        {
          'border-primary bg-primary/5': isDragActive,
          'border-destructive bg-destructive/5': isDragReject || errorMessage,
          'pointer-events-none opacity-60': isDisabled,
        }
      )}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 px-2 pb-8 pt-10 text-xs">
        <input {...getInputProps()} />
        
        <div className="rounded-full bg-primary/10 p-4 transition-colors duration-200">
          {isDisabled ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : isDragActive ? (
            <UploadCloud className="h-8 w-8 text-primary" />
          ) : (
            <FileIcon className="h-8 w-8 text-primary" />
          )}
        </div>

        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium">Drop your {type} file here</p>
            <p className="text-xs text-muted-foreground">
              or click to browse files
            </p>
          </div>
        </div>

        {(isDragReject || errorMessage) && (
          <p className="text-sm font-medium text-destructive">
            {errorMessage || `Please upload a valid ${type} file`}
          </p>
        )}

        <div className="text-[10px] text-muted-foreground">
          Maximum file size: {type === 'video' ? '50MB' : '10MB'}
        </div>

        {!isDisabled && !isDragActive && (
          <Button
            variant="secondary"
            size="sm"
            className="relative mt-2"
          >
            <span>Select File</span>
            <UploadCloud className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 
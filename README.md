# imatil

A modern web-based file converter built with Next.js 15, FFmpeg.wasm, and Shadcn UI components.

## Features

- Convert images between formats (PNG, JPG, JPEG, WebP, SVG)
- Convert videos between formats (MP4, WebM, AVI, MOV, MKV)
- Browser-based conversion using FFmpeg.wasm
- Modern UI with Shadcn UI and Radix UI primitives
- Real-time progress tracking
- Customizable quality and compression options

## Technical Stack

- Next.js 15.0.4
- React 19
- FFmpeg.wasm 0.12.10
- Shadcn UI
- TailwindCSS 3.4.1
- TypeScript 5

## Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── convert/             # Conversion routes
│   │   ├── image/          # Image conversion
│   │   │   ├── jpg/       # JPG conversions
│   │   │   ├── png/       # PNG conversions
│   │   │   ├── svg/       # SVG conversions
│   │   │   └── webp/      # WebP conversions
│   │   └── video/         # Video conversion
│   │       ├── avi/       # AVI conversions
│   │       ├── mkv/       # MKV conversions
│   │       ├── mov/       # MOV conversions
│   │       ├── mp4/       # MP4 conversions
│   │       └── webm/      # WebM conversions
│   ├── fonts/             # Web fonts
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/               # Shadcn UI components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   └── tabs.tsx
│   ├── back-button.tsx
│   ├── conversion-options.tsx
│   ├── converter-page.tsx
│   ├── file-dropzone.tsx
│   └── progress-bar.tsx
├── hooks/                  # Custom React hooks
│   └── use-conversion.ts
└── lib/                   # Utilities
    ├── utils.ts
    └── ffmpeg/           # FFmpeg integration
        ├── compression-utils.ts
        ├── config.ts
        ├── conversion-utils.ts
        ├── ffmpeg-init.ts
        └── types.ts
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Browser Requirements

- Modern browser with WebAssembly support
- Recommended: Chrome 90+, Firefox 90+, Safari 15+
- Minimum 4GB RAM for video conversions
- Stable internet connection for initial FFmpeg.wasm load

## Notes

- All conversions happen client-side using WebAssembly
- No files are uploaded to any server
- Memory usage is optimized for browser limitations
- Progress tracking for all conversions
- Automatic cleanup of temporary files

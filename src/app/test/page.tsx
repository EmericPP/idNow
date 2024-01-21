'use client'
import { useRef, useEffect } from 'react'
import { FaceDetectionStatus, useFaceDetector } from '@/hooks/useFaceDetector'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [face, status] = useFaceDetector(videoRef, canvasRef)

  useEffect(() => {
    console.log('face', face)
  }, [face])
  return (
    <main>
      <div className='myapp'>
        <h1>FAce Detection</h1>
        {status === FaceDetectionStatus.Success && <div>Cest bon</div>}
        {status === FaceDetectionStatus.Failed && <div>Cest PAS BOOON</div>}
        <div className='appvide'>
          <video width='940' height='650' crossOrigin='anonymous' ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} width='940' height='650' className='appcanvas' />
        </div>
      </div>
    </main>
  )
}

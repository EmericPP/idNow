'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import { faceApiDetection, initFaceApi } from '@/services/faceapi'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>()
  const canvasRef = useRef<HTMLCanvasElement>()
  const [faceDetected, setFaceDetected] = useState<boolean>(false)
  const [timeExceeded, setTimeExceeded] = useState<boolean>(false)

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
    } catch (e) {
      console.log(e)
    }
  }

  const faceDetector = useCallback(async () => {
    console.log('Ahahahahah')
    type Detections = Array<{
      score: number
      box: {
        left: number
        top: number
        right: number
        bottom: number
      }
    }> | null
    let detections: Detections = []

    const checkDetectionsInterval = setInterval(async () => {
      if (!timeExceeded) {
        detections = await faceApiDetection(videoRef, canvasRef)
        if (detections && detections[0]?.score >= 0.75) {
          setFaceDetected(true)
          clearInterval(checkDetectionsInterval)
          clearTimeout(authTimer)
        }
      }
    }, 750)

    const authTimer = setTimeout(() => {
      console.log('TIMEOUT')
      clearInterval(checkDetectionsInterval)
      setTimeExceeded(true)
    }, 5000)
    console.log('timeExceeded', timeExceeded)

    return detections
  }, [timeExceeded])

  useEffect(() => {
    const displayFaceDetectorScreen = async () => {
      if (videoRef) {
        console.log('videoref', videoRef.current)
        await startVideo()
        console.log('videoref 2', videoRef.current)

        await initFaceApi()
        await faceDetector()
      }
    }
    displayFaceDetectorScreen()
  }, [faceDetector])

  return (
    <main>
      <div className='myapp'>
        <h1>FAce Detection</h1>
        {faceDetected && <div>Cest bon</div>}
        {timeExceeded && <div>Cest PAS BOOON</div>}
        <div className='appvide'>
          <video width='940' height='650' crossOrigin='anonymous' ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} width='940' height='650' className='appcanvas' />
        </div>
      </div>
    </main>
  )
}

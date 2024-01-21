import { RefObject, useCallback, useEffect, useState } from 'react'
import { faceApiDetection, initFaceApi } from '@/services/faceapi'

type Detection = {
  score: number
  box: {
    left: number
    top: number
    right: number
    bottom: number
  }
}

type Detections = Array<Detection> | null

export enum FaceDetectionStatus {
  Pending,
  Success,
  Failed,
}

const startVideo = async (videoElement: HTMLVideoElement) => {
  try {
    videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: true })
  } catch (e) {
    console.log(e)
  }
}

export const useFaceDetector = (
  videoRef: RefObject<HTMLVideoElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  const [detectedFace, setDetectedFace] = useState<Detection>()
  const [detectionStatus, setDetectionStatus] = useState<FaceDetectionStatus>(
    FaceDetectionStatus.Pending,
  )

  const detectFace = useCallback(async () => {
    if (!videoRef?.current) return

    let detections: Detections = []

    const detectAface = async () => {
      detections = await faceApiDetection(videoRef, canvasRef)
      if (detections && detections[0]?.score >= 0.75) {
        setDetectionStatus(FaceDetectionStatus.Success)
        setDetectedFace(detections[0])
        clearInterval(checkDetectionsInterval)
        clearTimeout(authTimer)
      }
    }

    const setStatusAsFailed = () => {
      clearInterval(checkDetectionsInterval)
      setDetectionStatus(FaceDetectionStatus.Failed)
    }

    await startVideo(videoRef.current)
    const checkDetectionsInterval = setInterval(detectAface, 750)
    const authTimer = setTimeout(setStatusAsFailed, 10000)
  }, [canvasRef, videoRef])

  useEffect(() => {
    initFaceApi().then()
  }, [])

  useEffect(() => {
    if (detectionStatus === FaceDetectionStatus.Pending) detectFace().then()
  }, [detectFace, detectionStatus])

  return [detectedFace, detectionStatus]
}

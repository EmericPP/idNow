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
  Pending = 0,
  Success = 1,
  Failed = 2,
}

type FaceDetectorStatus = {
  isSuccessful: boolean
  isPending: boolean
  isFailed: boolean
}

const startVideo = async (videoElement: HTMLVideoElement) => {
  try {
    videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: true })
  } catch (e) {
    console.log(e)
  }
}

const getStatusVars = (detectionStatus: FaceDetectionStatus): FaceDetectorStatus => {
  return {
    isSuccessful: detectionStatus === FaceDetectionStatus.Success,
    isPending: detectionStatus === FaceDetectionStatus.Pending,
    isFailed: detectionStatus === FaceDetectionStatus.Failed,
  }
}

export const useFaceDetector = (
  videoRef: RefObject<HTMLVideoElement>,
): {
  detectedFace: Detection | null
  isSuccessful: boolean
  isPending: boolean
  isFailed: boolean
} => {
  const [detectedFace, setDetectedFace] = useState<Detection | null>(null)
  const [detectionStatus, setDetectionStatus] = useState<FaceDetectionStatus>(
    FaceDetectionStatus.Pending,
  )

  const detectFace = useCallback(async () => {
    if (!videoRef?.current) return

    let detections: Detections = []

    const detectAface = async () => {
      detections = await faceApiDetection(videoRef)
      if (detections && detections[0]?.score >= 0.75) {
        setDetectionStatus(FaceDetectionStatus.Success)
        setDetectedFace(detections[0])
        clearInterval(checkDetectionsInterval)
        clearTimeout(authTimer)
      }
    }

    await startVideo(videoRef.current)
    const checkDetectionsInterval = setInterval(detectAface, 750)
    const authTimer = setTimeout(() => setDetectionStatus(FaceDetectionStatus.Failed), 10000)
  }, [videoRef])

  useEffect(() => {
    initFaceApi().then()
  }, [])

  useEffect(() => {
    if (detectionStatus !== FaceDetectionStatus.Success) detectFace().then()
  }, [detectFace, detectionStatus])

  return { detectedFace, ...getStatusVars(detectionStatus) }
}

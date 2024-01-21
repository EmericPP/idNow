import * as faceapi from 'face-api.js'
import { RefObject } from 'react'
import { DetectAllFacesTask } from 'face-api.js/build/commonjs/globalApi/DetectFacesTasks'

export const initFaceApi = async () => {
  await faceapi.loadTinyFaceDetectorModel('/models')
}

export const faceApiDetection = async (
  videoRef: RefObject<HTMLVideoElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
): Promise<DetectAllFacesTask | null> => {
  if (!videoRef.current || !canvasRef.current) return null
  const detections = await faceapi.detectAllFaces(
    videoRef.current,
    new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }),
  )

  // DRAW YOU FACE IN WEBCAM
  canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
  faceapi.matchDimensions(canvasRef.current, {
    width: 940,
    height: 650,
  })

  const resized = faceapi.resizeResults(detections, {
    width: 940,
    height: 650,
  })

  faceapi.draw.drawDetections(canvasRef.current, resized)

  return detections
}

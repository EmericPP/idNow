import * as faceapi from 'face-api.js'
import { RefObject } from 'react'
import { DetectAllFacesTask } from 'face-api.js/build/commonjs/globalApi/DetectFacesTasks'

export const initFaceApi = async () => {
  await faceapi.loadTinyFaceDetectorModel('/models')
}

export const faceApiDetection = async (
  videoRef: RefObject<HTMLVideoElement>,
): Promise<DetectAllFacesTask | null> => {
  if (!videoRef.current) return null
  return faceapi.detectAllFaces(
    videoRef.current,
    new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }),
  )
}

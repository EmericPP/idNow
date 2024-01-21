'use client'
import { useEffect, useRef } from 'react'
import { useFaceDetector } from '@/hooks/useFaceDetector'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header/Header'
import FaceDetector from '@/components/FaceDetector/FaceDetector'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { isSuccessful, isPending, isFailed } = useFaceDetector(videoRef)

  const router = useRouter()

  useEffect(() => {
    console.log('isSuccessful', isSuccessful)
    if (isSuccessful) {
      setTimeout(() => {
        router.push('/profile')
      }, 1200)
    }
  }, [isSuccessful, router])

  return (
    <main>
      <div className='app-wrapper'>
        <Header isSuccessful={isSuccessful} isPending={isPending} isFailed={isFailed} />
        <FaceDetector videoRef={videoRef} isSuccessful={isSuccessful} isFailed={isFailed} />
      </div>
    </main>
  )
}

import styles from './faceDetector.module.css'
import cx from 'classnames'
import { RefObject } from 'react'
import CheckIcon from '@/assets/icons/check.svg'
import Image from 'next/image'

type Props = {
  videoRef: RefObject<HTMLVideoElement>
  isSuccessful: boolean
  isFailed: boolean
}
export default function Home({ videoRef, isSuccessful, isFailed }: Props) {
  return (
    <div className={styles.appVideo}>
      <video
        className={styles.video}
        width='860'
        height='650'
        crossOrigin='anonymous'
        ref={videoRef}
        autoPlay
      />
      <div className={styles.focusIconContainer}>
        <div
          className={cx(styles.focusIcon, {
            [styles.success]: isSuccessful,
            [styles.failed]: isFailed,
          })}
        >
          {isSuccessful && (
            <Image className={styles.checkIcon} priority src={CheckIcon} alt='Idnow logo' />
          )}
        </div>
      </div>
    </div>
  )
}

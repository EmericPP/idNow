import styles from './header.module.css'
import Image from 'next/image'
import Logo from '@/assets/images/logo.svg'

export type Props = {
  isSuccessful: boolean
  isPending: boolean
  isFailed: boolean
}
export function Header({ isSuccessful, isPending, isFailed }: Props) {
  const getStatusText = (): string => {
    if (isSuccessful) return 'Perfect, you will be redirected !'
    if (isPending) return 'Smile at the camera !'
    if (isFailed) return 'Oh :( Where are You ?!'
    return 'Lets go to face authentication'
  }

  return (
    <header className={styles.header}>
      <Image className={styles.logo} priority src={Logo} alt='Idnow logo' />
      <h1 className={styles.title}>
        Hi ! Welcome at Idnow,
        <div className={styles.highlightedText}>{getStatusText()}</div>
      </h1>
    </header>
  )
}

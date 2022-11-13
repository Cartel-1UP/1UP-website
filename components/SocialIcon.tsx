import Image from 'next/image';
import Link from 'next/link';

const SocialIcon = () => {

  return (
    <Link href="/dashboard">
      <Image
        src={'/social-icons/github.svg'} 
        alt={'/docs'} 
        height={20}
        width={20}     
      />
    </Link>
  )
}

export default SocialIcon

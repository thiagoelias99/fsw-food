import Image from 'next/image'
import SideMenu from '../side-menu'

export default function Header() {
  return (
    <header className='flex flex-row justify-between items-center h-16 px-4 pt-4 pb-2'>
      <Image src='/logo.png' alt='logo' width={100} height={100} />
      <SideMenu />
    </header>
  )
}

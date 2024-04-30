import Image from 'next/image'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className='flex flex-row justify-between items-center h-16 px-4 pt-4 pb-2'>
      <Image src='/logo.png' alt='logo' width={100} height={100} />
      <Button size="icon" variant="ghost">
        <MenuIcon size={24} />
      </Button>
    </header>
  )
}

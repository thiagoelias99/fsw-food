import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogIn } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  className?: ClassNameValue
}

export default function LoginSection({ className }: Props) {
  return (
    <div className={cn('w-full flex flex-row justify-between items-center', className)}>
      <p className='font-semibold'>Olá, faça seu login!</p>
      <Button size='icon'>
        <LogIn size={24} />
      </Button>
    </div>
  )
}
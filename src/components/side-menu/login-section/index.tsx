'use client'

import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogIn } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import Image from 'next/image'

interface Props {
  className?: ClassNameValue
}

export default function LoginSection({ className }: Props) {
  const { data, status } = useSession()

  return (
    <div className={cn('', className)}>
      {status !== 'authenticated' && (
        <div className='w-full flex flex-row justify-between items-center'>
          <p className='font-semibold'>Olá, faça seu login!</p>
          <Button
            size='icon'
            onClick={handleLoginClick}
          >
            <LogIn size={24} />
          </Button>
        </div>
      )}
      {status === 'authenticated' && (
        <div className='w-full flex flex-row justify-start items-center gap-2'>
          <div className='relative w-12 h-12 rounded-full border-2 border-primary'>
            <Image
              src={data?.user?.image || ''}
              alt='User profile image'
              fill
              objectFit='cover'
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col justify-start items-start'>
            <p className='font-semibold'>{data?.user?.name}</p>
            <p className='text-xs text-muted-foreground'>{data?.user?.email}</p>
          </div>
        </div>
      )}
    </div>
  )
}

async function handleLoginClick() {
  await signIn()
}


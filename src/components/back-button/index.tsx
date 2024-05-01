'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  className?: ClassNameValue
}

export default function BackButton({ className }: Props) {
  const router = useRouter()

  return (
    <Button
      size='icon'
      className={cn('bg-white border-0 text-black rounded-full', className)}
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  )
}

'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  className?: ClassNameValue
}

export default function QuantityInput({ className }: Props) {
  const [value, setValue] = useState(0)

  return (
    <div className={cn('flex flex-row justify-center items-center gap-2', className)}>
      <Button
        size='icon'
        onClick={() => setValue(curr => curr - 1)}
        disabled={value === 0}
        variant={value === 0 ? 'outline' : 'default'}
        className={value === 0 ? 'border-muted-foreground' : ''}
      ><ChevronLeft /></Button>
      <p className='text-base w-4 text-center'>{value}</p>
      <Button
        size='icon'
        onClick={() => setValue(curr => curr + 1)}
      ><ChevronRight /></Button>
    </div>
  )
}

'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  className?: ClassNameValue
  value: number
  onChange: (value: number) => void
}

export default function QuantityInput({ className, onChange, value }: Props) {
  const minValue = 1

  return (
    <div className={cn('flex flex-row justify-center items-center gap-2', className)}>
      <Button
        size='icon'
        onClick={() => onChange(value - 1)}
        disabled={value === minValue}
        variant={value === minValue ? 'outline' : 'default'}
        className={value === minValue ? 'border-muted-foreground' : ''}
      ><ChevronLeft /></Button>
      <p className='text-base w-4 text-center'>{value}</p>
      <Button
        size='icon'
        onClick={() => onChange(value + 1)}
      ><ChevronRight /></Button>
    </div>
  )
}

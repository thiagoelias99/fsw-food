import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { Badge } from '../ui/badge'
import { StarIcon } from 'lucide-react'

interface Props {
  rating: number
  className?: ClassNameValue
}

export default function StarsBadge({ rating, className }: Props) {
  return (
    <Badge className={cn('px-2 py-1 z-50 text-xs font-semibold bg-white text-foreground flex flex-row justify-center items-center gap-1', className)}>
      <StarIcon size={12} className='fill-yellow-500 stroke-yellow-500' />
      <p>{rating.toFixed(1)}</p>
    </Badge>
  )
}

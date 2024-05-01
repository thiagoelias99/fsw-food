
import React from 'react'
import { Badge } from '../ui/badge'
import { ClassNameValue } from 'tailwind-merge'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  discountPercentage: number
  className?: ClassNameValue
}

export default function DiscountPercentBadge({ discountPercentage, className }: Props) {
  return (
    <Badge variant="destructive" className={cn(`px-2 py-1 z-50 text-xs ${discountPercentage === 0 ? 'hidden' : ''}`, className)} > <ArrowDown size={12} /> {`${discountPercentage}%`}</Badge>
  )
}

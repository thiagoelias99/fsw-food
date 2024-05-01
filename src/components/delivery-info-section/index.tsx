import { formatCurrency } from '@/lib/format-currecy'
import { cn } from '@/lib/utils'
import { Restaurant } from '@prisma/client'
import { AlarmClock, BikeIcon } from 'lucide-react'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

interface Props {
  className?: ClassNameValue
  restaurant?: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'> | null
}

export default function DeliveryInfoSection({ restaurant, className }: Props) {

  const deliveryFeeFormatted = Number(restaurant?.deliveryFee) === 0 ? 'Entrega Grátis' : formatCurrency(Number(restaurant?.deliveryFee))

  return (
    <section className={cn('h-14 flex flex-row justify-center items-center rounded-md border border-muted', className)}>
      <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <div className='flex flex-row justify-center items-center gap-1'>
          <p className='text-xs text-muted-foreground'>Entrega</p>
          <BikeIcon size={18} className='stroke-muted-foreground' />
        </div>
        <p className='text-xs font-semibold'>{deliveryFeeFormatted}</p>
      </div>
      <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <div className='flex flex-row justify-center items-center gap-1'>
          <p className='text-xs text-muted-foreground'>Entrega</p>
          <AlarmClock size={18} className='stroke-muted-foreground' />
        </div>
        <p className='text-xs font-semibold'>{restaurant?.deliveryTimeMinutes} min</p>
      </div>
    </section>
  )
}

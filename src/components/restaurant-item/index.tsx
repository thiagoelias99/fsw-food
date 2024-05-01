import NextLink from 'next/link'
import { formatCurrency } from '@/lib/format-currecy'
import Image from 'next/image'
import React from 'react'
import { Badge } from '../ui/badge'
import { AlarmClock, ArrowDown, BikeIcon, HeartIcon, StarIcon } from 'lucide-react'
import { Prisma, Restaurant } from '@prisma/client'
import { Button } from '../ui/button'
import StarsBadge from '../stars-badge'

interface Props extends Restaurant { }

export default async function RestaurantItem({ id, imageUrl, name, deliveryFee, deliveryTimeMinutes }: Props) {
  const deliveryFeeFormatted = Number(deliveryFee) === 0 ? 'Entrega Grátis' : formatCurrency(Number(deliveryFee))

  return (
    <li className='h-[187px] min-w-[266px] flex flex-col justify-start items-start'>
      <NextLink href={`/restaurants/${id}`} passHref>
        <div className='h-[136px] w-[266px] relative'>
          <Image
            src={imageUrl}
            alt='product image'
            fill
            objectFit='cover'
            className='rounded-lg'
          />
          <StarsBadge rating={4.8} className='absolute top-2 left-2' />
          <Button size='icon' className='absolute top-2 right-2 w-7 h-7 bg-muted-foreground rounded-full'><HeartIcon size={16} className='fill-white stroke-white' /></Button>
        </div>
        <div className='mt-2 flex flex-col justify-start items-start'>
          <h3 className='text-sm font-semibold truncate'>{name}</h3>
          <div className='flex flex-row justify-start items-center gap-2'>
            <div className='flex flex-row justify-start items-center gap-2'>
              <BikeIcon size={16} className='text-primary' />
              <p className='text-xs text-muted-foreground'> {deliveryFeeFormatted}</p>
            </div>
            <div className='flex flex-row justify-start items-center gap-2'>
              <AlarmClock size={16} className='text-primary' />
              <p className='text-xs text-muted-foreground'>{deliveryTimeMinutes} min</p>
            </div>
          </div>
        </div>
      </NextLink>
    </li>
  )
}

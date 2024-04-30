import { formatCurrency } from '@/lib/format-currecy'
import Image from 'next/image'
import React from 'react'
import { Badge } from '../ui/badge'
import { ArrowDown } from 'lucide-react'
import { Prisma } from '@prisma/client'

interface Props extends Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true
      }
    }
  }
}> { }

export default async function ProductItem({price, discountPercentage, imageUrl, name, restaurant} : Props) {
  const actualPrice = Number(price) * (1 - Number(discountPercentage) / 100)

  return (
    <li className='h-[220px] min-w-[150px] flex flex-col justify-start items-start'>
      <div className='h-[150px] w-[150px] relative'>
        <Image
          src={imageUrl}
          alt='product image'
          fill
          objectFit='cover'
          className='rounded-lg'
        />
        <Badge variant="destructive" className='absolute top-2 left-2 px-2 py-1 z-50 text-xs' > <ArrowDown size={12} /> {`${discountPercentage}%`}</Badge>
      </div>
      <div className='mt-2 flex flex-col justify-start items-start'>
        <h3 className='text-sm truncate'>{name}</h3>
        <div className='flex flex-row justify-start items-center gap-2'>
          <p className='text-base font-semibold'>{formatCurrency(actualPrice)}</p>
          <p className='text-xs text-muted-foreground line-through'>{formatCurrency(Number(price))}</p>
        </div>
        <h4 className='text-xs text-muted-foreground truncate'>{restaurant.name}</h4>
      </div>
    </li>
  )
}

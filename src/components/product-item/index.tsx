import NextLink from 'next/link'
import { formatCurrency } from '@/lib/format-currecy'
import Image from 'next/image'
import React from 'react'
import { Prisma } from '@prisma/client'
import DiscountPercentBadge from '../discount-percent-badge'

interface Props extends Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        name: true
      }
    }
  }
}> {
  showRestaurant?: boolean
}

export default function ProductItem({ id, price, discountPercentage, imageUrl, name, restaurant, showRestaurant = false }: Props) {
  const actualPrice = Number(price) * (1 - Number(discountPercentage) / 100)

  return (
    <li className='h-[220px] min-w-[150px] flex flex-col justify-start items-start'>
      <NextLink href={`/products/${id}`} passHref>
        <div className='h-[150px] w-[150px] relative'>
          <Image
            src={imageUrl}
            alt='product image'
            fill
            objectFit='cover'
            className='rounded-lg'
          />
          <DiscountPercentBadge discountPercentage={discountPercentage} className='absolute top-2 left-2' />
        </div>
        <div className='mt-2 flex flex-col justify-start items-start'>
          <h3 className='text-sm truncate'>{name}</h3>
          <div className='flex flex-row justify-start items-center gap-2'>
            <p className='text-base font-semibold'>{formatCurrency(actualPrice)}</p>
            {discountPercentage > 0 && (
              <p className='text-xs text-muted-foreground line-through'>{formatCurrency(Number(price))}</p>
            )}
          </div>
          <h4 className={`text-xs text-muted-foreground truncate ${showRestaurant ? '' : 'hidden'}`}>{restaurant.name}</h4>
        </div>
      </NextLink>
    </li>
  )
}

import { ChevronRight } from 'lucide-react'
import React from 'react'
import ProductItem from '../product-item'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import NextLink from 'next/link'

interface Props {
  className?: ClassNameValue
  hideRestaurantName?: boolean
  sectionTitle: string
  linkTo?: string
  products?: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        }
      }
    }
  }>[]
}

export default async function ProductSection({ linkTo, className, products, hideRestaurantName, sectionTitle }: Props) {

  return (
    <section className={cn('w-full flex flex-col gap-2', className)}>
      <div className='w-full px-4 flex flex-row justify-between items-center'>
        <h2 className='font-semibold text-base'>{sectionTitle}</h2>
        {linkTo && (
          <NextLink href={linkTo} passHref>
            <div className='flex flex-row justify-end items-center gap-1'>
              <p className='text-xs text-primary'>Ver todos</p>
              <ChevronRight className='text-primary' size={16} />
            </div>
          </NextLink>
        )}
      </div>
      <ul className='w-full px-4 flex flex-row justify-start items-center gap-4 overflow-x-scroll [&::-webkit-scrollbar]'>
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            showRestaurant={!hideRestaurantName}
            {...product}
          />
        ))}
      </ul>
    </section>
  )
}

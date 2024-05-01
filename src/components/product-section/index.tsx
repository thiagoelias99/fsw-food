import { ChevronRight } from 'lucide-react'
import React from 'react'
import ProductItem from '../product-item'
import prisma from '@/prisma/prisma-client'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  className?: ClassNameValue
}

export default async function ProductSection({ className }: Props) {
  const products = await prisma.product.findMany(
    {
      where: {
        discountPercentage: {
          gt: 0
        }
      },
      // orderBy: {
      //   discountPercentage: 'desc'
      // },
      take: 10,
      include: {
        restaurant: {
          select: {
            name: true
          }
        }
      }
    }
  )

  return (
    <section className={cn('w-full flex flex-col gap-2', className)}>
      <div className='w-full px-4 flex flex-row justify-between items-center'>
        <h2 className='font-semibold text-base'>Pedidos Recomendados</h2>
        <div className='flex flex-row justify-end items-center gap-1'>
          <p className='text-xs text-primary'>Ver todos</p>
          <ChevronRight className='text-primary' size={16} />
        </div>
      </div>
      <ul className='w-full px-4 flex flex-row justify-start items-center gap-4 overflow-x-scroll [&::-webkit-scrollbar]'>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            showRestaurant
            {...product}
          />
        ))}
      </ul>
    </section>
  )
}

import { ChevronRight } from 'lucide-react'
import React from 'react'
import prisma from '@/prisma/prisma-client'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import RestaurantItem from '../restaurant-item'

interface Props {
  className?: ClassNameValue
}

export default async function RestaurantsSection({ className }: Props) {
  const restaurants = await prisma.restaurant.findMany(
    {
      take: 8
    }
  )

  return (
    <section className={cn('w-full flex flex-col gap-2', className)}>
      <div className='w-full px-4 flex flex-row justify-between items-center'>
        <h2 className='font-semibold text-base'>Restaurantes Recomendados</h2>
        <div className='flex flex-row justify-end items-center gap-1'>
          <p className='text-xs text-primary'>Ver todos</p>
          <ChevronRight className='text-primary' size={16} />
        </div>
      </div>
      <ul className='w-full px-4 flex flex-row justify-start items-center gap-4 overflow-x-scroll [&::-webkit-scrollbar]'>
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            {...restaurant}
          />
        ))}
      </ul>
    </section>
  )
}

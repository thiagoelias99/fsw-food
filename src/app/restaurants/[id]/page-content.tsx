import React from 'react'
import Image from 'next/image'
import BackButton from '@/components/back-button'
import StarsBadge from '@/components/stars-badge'
import DeliveryInfoSection from '@/components/delivery-info-section'
import ProductSection from '@/components/product-section'
import { Prisma } from '@prisma/client'
import CartPopUp from '@/components/cart-popup'

interface Props {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true
      products: {
        include: {
          restaurant: true
          category: true
        }
      }
    }
  }>
}

export default function RestaurantDetailsContent({ restaurant }: Props) {
  return (
    <main className='flex flex-col mb-20'>
      <section className='relative w-full h-[356px]'>
        <Image
          src={restaurant?.imageUrl || ''}
          alt='product image'
          fill
          objectFit='cover'
        />
        <BackButton className='absolute top-4 left-4' />
      </section>
      <div className='relative w-full flex-1 bg-white rounded-t-3xl -top-6'>
        <section className='w-full p-4 flex justify-between items-center'>
          <div className='p-4 flex flex-row justify-start items-center gap-2'>
            <div className='relative w-8 h-8 rounded-full'>
              <Image
                src={restaurant?.imageUrl || ''}
                alt='restaurant image'
                fill
                objectFit='cover'
                className='rounded-full'
              />
            </div>
            <h1 className='text-xl font-semibold' >{restaurant?.name}</h1>
          </div>
          <StarsBadge rating={4.6} className='bg-foreground text-white' />
        </section>
        <DeliveryInfoSection restaurant={restaurant} className='mx-4' />
        <ProductSection
          sectionTitle='Os Mais Pedidos'
          className='mt-4'
          products={restaurant?.products}
          hideRestaurantName
        />
        {restaurant?.categories.map((category) => (
          <ProductSection
            key={category.id}
            sectionTitle={category.name}
            className='mt-4'
            products={restaurant?.products.filter(product => product.categoryId === category.id)}
            hideRestaurantName
          />
        ))}
      </div>
      <CartPopUp className='fixed bottom-0' />
    </main>
  )
}

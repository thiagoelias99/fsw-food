import { formatCurrency } from '@/lib/format-currecy'
import prisma from '@/prisma/prisma-client'
import Image from 'next/image'
import React from 'react'

interface Props {
  params: {
    id?: string
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      restaurant: true
    }
  })

  const actualPrice = Number(product?.price) * (1 - Number(product?.discountPercentage) / 100)

  return (
    <main className='flex flex-col'>
      <section className='relative w-full h-[356px]'>
        <Image
          src={product?.imageUrl || ''}
          alt='product image'
          fill
          objectFit='cover'
        />
      </section>
      <section className='relative w-full p-4 flex-1 bg-white rounded-t-3xl -top-6'>
        <div className='flex flex-row justify-start items-center gap-2'>
          <div className='relative w-6 h-6 rounded-full'>
            <Image
              src={product?.restaurant.imageUrl || ''}
              alt='restaurant image'
              fill
              objectFit='cover'
              className='rounded-full'
            />
          </div>
          <h2 className='text-sx text-muted-foreground' >{product?.restaurant.name}</h2>
        </div>
        <h1 className='text-xl font-semibold mt-2'>{product?.name}</h1>
        <div className='w-full flex justify-between items-center'>
          <div>
            <p className='text-xl font-semibold'>{formatCurrency(actualPrice)}</p>
            <p className='text-sm text-muted-foreground line-through'>De: {formatCurrency(Number(product?.price))}</p>
          </div>

        </div>
      </section>
    </main>
  )
}

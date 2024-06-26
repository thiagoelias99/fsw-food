'use client'

import BackButton from '@/components/back-button'
import DeliveryInfoSection from '@/components/delivery-info-section'
import DiscountPercentBadge from '@/components/discount-percent-badge'
import ProductItem from '@/components/product-item'
import QuantityInput from '@/components/quantity-input'
import { Button } from '@/components/ui/button'
import { CartContext, CartProduct } from '@/context/cart-context'
import { formatCurrency } from '@/lib/format-currecy'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { useContext, useState } from 'react'

interface Props {
  product?: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
      category: {
        select: {
          name: true
        }
      }
    }
  }>
  otherProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

export default function ProductDetailsContent({ product, otherProducts }: Props) {
  const [quantity, setQuantity] = useState(1)
  const { addProduct } = useContext(CartContext)

  if (!product) {
    return null
  }

  const actualPrice = Number(product.price) * (1 - Number(product.discountPercentage) / 100)

  function addProductToCart() {
    addProduct({ ...product, quantity } as CartProduct)
  }

  return (
    <main className='flex flex-col'>
      <section className='relative w-full h-[356px]'>
        <Image
          src={product?.imageUrl || ''}
          alt='product image'
          fill
          objectFit='cover'
        />
        <BackButton className='absolute top-4 left-4' />
      </section>
      <div className='relative w-full flex-1 bg-white rounded-t-3xl -top-6'>
        <section className='p-4 flex flex-row justify-start items-center gap-2' >
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
        </section>
        {/* Product Infos */}
        <section className='px-4'>
          <h1 className='text-xl font-semibold mt-6'>{product?.name}</h1>
          <div className='w-full flex justify-between items-center'>
            <div>
              <div className='flex flex-row justify-start items-center gap-2'>
                <p className='text-xl font-semibold'>{formatCurrency(actualPrice)}</p>
                <DiscountPercentBadge discountPercentage={product?.discountPercentage || 0} />
              </div>
              {product?.price && product?.discountPercentage > 0 && (
                <p className='text-sm text-muted-foreground line-through'>De: {formatCurrency(Number(product?.price))}</p>
              )}
            </div>
            <QuantityInput value={quantity} onChange={setQuantity} />
          </div>
        </section>
        <DeliveryInfoSection restaurant={product?.restaurant} className='mt-6 mx-4' />
        {/* Description */}
        <section className='px-4 mt-6 flex flex-col justify-start items-start gap-2'>
          <h3 className='font-semibold'>Sobre</h3>
          <p className='text-sm text-muted-foreground'>{product?.description}</p>
        </section>
        {/* Recommendeds */}
        <section className='mt-6 flex flex-col justify-start items-start gap-2'>
          <h3 className='px-4 font-semibold'>Outros {product?.category.name}</h3>
          <ul className='w-full px-4 flex flex-row justify-start items-center overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden'>
            {otherProducts.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </ul>
        </section>
        <div className='px-4'>
          <Button
            className='w-full'
            onClick={addProductToCart}
            disabled={quantity === 0}
          >Adicionar à sacola</Button>
        </div>
      </div>
    </main>
  )
}

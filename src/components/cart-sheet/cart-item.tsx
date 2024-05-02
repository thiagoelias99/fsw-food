'use client'

import QuantityInput from '../quantity-input'
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { CartContext, CartProduct } from '@/context/cart-context'
import { formatCurrency } from '@/lib/format-currecy'
import Image from 'next/image'

interface Props {
  product: CartProduct
}

export default function CartItem({ product }: Props) {
  // const [quantity, setQuantity] = useState(product.quantity)
  const { updateProduct, removeProduct } = useContext(CartContext)

  const actualPrice = Number(product.price) * (1 - Number(product.discountPercentage) / 100)

  function updateQuantity(quantity: number) {
    updateProduct({
      ...product,
      quantity
    })
  }

  return (
    <li className='w-full h-24 flex flex-row justify-start items-center gap-4'>
      <div className='relative min-w-24 min-h-24 rounded-md bg-slate-300'>
        <Image
          src={product.imageUrl}
          alt='Product image'
          fill
          objectFit='cover'
          className='rounded-md'
        />
      </div>
      <div className='w-full flex justify-between items-center'>
        <div className='flex flex-col justify-start items-start'>
          <p className='text-xs'>{product.name}</p>
          <div className='flex justify-start items-center gap-1'>
            <p className='text-sm font-semibold'>{formatCurrency(actualPrice)}</p>
            {product.discountPercentage > 0 && (
              <p className='text-xs text-muted-foreground line-through'>{formatCurrency(Number(product.price))}</p>
            )}
          </div>
          <QuantityInput
            value={product.quantity}
            onChange={updateQuantity}
          />
        </div>
        <Button
          size='icon'
          variant='outline'
          className='border-muted'
          onClick={() => removeProduct(product.id)}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </li>
  )
}

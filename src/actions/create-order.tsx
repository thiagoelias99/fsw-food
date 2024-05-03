'use server'

import { CartProduct, ICartSummary } from '@/context/cart-context'
import prisma from '@/prisma/prisma-client'
import { OrderStatus } from '@prisma/client'

export async function createOrder(summary: ICartSummary, restaurantId: string, products: CartProduct[], userId: string) {
  return await prisma.order.create({data: {
    deliveryFee: summary.deliveryFee,
    status: OrderStatus.PENDING,
    userId,
    restaurantId,
    products: {
      create: products.map(product => ({
        quantity: product.quantity,
        productId: product.id,
        price: product.price,
        discountPercentage: product.discountPercentage
      }))
    }
  }})
}
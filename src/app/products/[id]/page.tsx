import prisma from '@/prisma/prisma-client'
import React from 'react'
import ProductDetailsContent from './page-content'
import { Product } from '@prisma/client'

interface Props {
  params: {
    id?: string
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      restaurant: true,
      category: {
        select: {
          name: true
        }
      }
    }
  })

  const otherProducts = await prisma.product.findMany({
    where: {
      categoryId: product?.categoryId,
      NOT: { id: product?.id },
      restaurantId: product?.restaurantId
    },
    take: 5,
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <ProductDetailsContent product={{ ...product } as any} otherProducts={otherProducts} />
  )
}

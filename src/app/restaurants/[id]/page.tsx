import prisma from '@/prisma/prisma-client'
import RestaurantDetailsContent from './page-content'

interface Props {
  params: {
    id?: string
  }
}

export default async function RestaurantDetailsPage({ params }: Props) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: {
      categories: true,
      products: {
        include: {
          restaurant: true,
          category: true
        }
      }
    }
  })

  return (
    <RestaurantDetailsContent restaurant={restaurant as any} />
  )
}

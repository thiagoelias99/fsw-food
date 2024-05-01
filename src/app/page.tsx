import CategoryItem from '@/components/category-item'
import Header from '@/components/header'
import ProductSection from '@/components/product-section'
import RestaurantsSection from '@/components/restaurant-section'
import SearchField from '@/components/search-field'
import prisma from '@/prisma/prisma-client'
import Image from 'next/image'

export default async function Home() {
  const categories = await prisma.category.findMany()

  const products = await prisma.product.findMany(
    {
      where: {
        discountPercentage: {
          gt: 0
        }
      },
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
    <main className='pb-4'>
      <Header />
      <SearchField />
      <section className='w-screen px-4 mt-4 flex flex-row justify-start items-center gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            {...category}
          />
        ))}
      </section>
      <section className='relative w-screen h-[172px] mt-4 p-4'>
        <Image
          src={'/banner1.png'}
          alt='pizza banner'
          fill
          objectFit='contain'
        />
      </section>
      <ProductSection
        sectionTitle='Promoções'
        className='mt-4'
        products={products}
        linkTo='/'
      />
      <section className='relative w-screen h-[172px] mt-4 p-4'>
        <Image
          src={'/banner2.png'}
          alt='pizza banner'
          fill
          objectFit='contain'
        />
      </section>
      <RestaurantsSection className='mt-4' />
    </main>
  )
}
import CategoryItem from '@/components/category-item'
import ProductSection from '@/components/product-section'
import SearchField from '@/components/search-field'
import prisma from '@/prisma/prisma-client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default async function Home() {
  const categories = await prisma.category.findMany()

  return (
    <main>
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
      <ProductSection className='mt-4'/>
      <section className='relative w-screen h-[172px] mt-4 p-4'>
        <Image
          src={'/banner2.png'}
          alt='pizza banner'
          fill
          objectFit='contain'
        />
      </section>
    </main>
  )
}
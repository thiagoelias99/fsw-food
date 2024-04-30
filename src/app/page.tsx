import CategoryItem from '@/components/category-item'
import SearchField from '@/components/search-field'
import prisma from '@/prisma/prisma-client'

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
    </main>
  )
}
import React from 'react'
import { Badge } from '../ui/badge'
import { Category } from '@prisma/client'
import Image from 'next/image'

interface Props extends Category { }

export default function CategoryItem({ id, imageUrl, name }: Props) {
  return (
    <Badge
      className='h-12 w-fit px-4 flex flex-row justify-start items-center gap-2  bg-white text-black'
    >
      <div className='w-7 h-7 relative'>
        <Image
          src={imageUrl}
          alt='Category Image'
          fill
          objectFit='contain'
        />
      </div>
      <p className='text-sm font-semibold'>
        {name}
      </p>
    </Badge>
  )
}

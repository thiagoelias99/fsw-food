// 'use client'

import { ClassNameValue } from 'tailwind-merge'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface Props {
  className?: ClassNameValue
}

export default function CartPopUp({ className }: Props) {
  return (
    <Card className={cn('min-w-full z-50', className)}>
      <div className='h-20 px-4 py-2 flex flex-row justify-between items-center'>
        <div className='h-full py-4 flex flex-col justify-start items-start'>
          <p className='text-xs text-muted-foreground'>Total sem entrega</p>
          <div className='flex justify-start items-center'>
            <p className='font-semibold'>R$ 30,00</p>
            <p className='text-xs text-muted-foreground'>/ 1 item</p>
          </div>
        </div>
        <div className='h-full flex justify-end items-center'>
          <Button size='lg'>
            Ver Sacola
          </Button>
        </div>
      </div>
    </Card>
  )
}

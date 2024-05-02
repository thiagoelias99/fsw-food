'use client'

import { ClassNameValue } from 'tailwind-merge'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useContext } from 'react'
import { CartContext } from '@/context/cart-context'
import { formatCurrency } from '@/lib/format-currecy'

interface Props {
  className?: ClassNameValue
}

export default function CartPopUp({ className }: Props) {
  const { summary, setSheetOpenState } = useContext(CartContext)

  const totalItemString = `/ ${summary.totalItems} ite${summary.totalItems > 1 ? 'ns' : 'm'}`


  return (
    <Card className={cn(`min-w-full z-50 ${summary.totalItems > 0 ? '' : 'hidden'}`, className)}>
      <div className='h-20 px-4 py-2 flex flex-row justify-between items-center'>
        <div className='h-full py-4 flex flex-col justify-start items-start'>
          <p className='text-xs text-muted-foreground'>Total sem entrega</p>
          <div className='flex justify-start items-center'>
            <p className='font-semibold'>{formatCurrency(summary.total)}</p>
            <p className='text-xs text-muted-foreground'>{totalItemString}</p>
          </div>
        </div>
        <div className='h-full flex justify-end items-center'>
          <Button
            size='lg'
            onClick={() => setSheetOpenState(true)}
          >
            Ver Sacola
          </Button>
        </div>
      </div>
    </Card>
  )
}

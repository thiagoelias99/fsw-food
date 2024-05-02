'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet'
import { CartContext } from '@/context/cart-context'
import { useContext } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import CartItem from './cart-item'
import { Card, CardContent } from '../ui/card'
import { formatCurrency } from '@/lib/format-currecy'
import { ScrollArea } from '@radix-ui/react-scroll-area'

export default function CartSheet() {
  const { sheetOpenState, setSheetOpenState, products, summary } = useContext(CartContext)

  return (
    <Sheet open={sheetOpenState} onOpenChange={setSheetOpenState}>
      <SheetContent className='w-[90%] h-full flex flex-col'>
        <SheetHeader className='w-full flex flex-col justify-start items-start'>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg font-semibold text-left'>Sacola</h1>
            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <X size={24} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        {products.length === 0 && (
          <div className='flex-1 flex flex-col justify-center items-center'>
            <p className='text-muted-foreground'>Sua sacola está vazia</p>
          </div>
        )}
        {products.length > 0 && (
          <>
            <ScrollArea className="h-[496px] overflow-y-auto">
              <ul className='list-none flex flex-1 flex-col gap-2'>
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ul>
            </ScrollArea>
            <Card>
              <CardContent className='py-4 flex flex-col justify-start items-start gap-2'>
                <div className='w-full flex justify-between items-center'>
                  <p className='text-xs text-muted-foreground'>Subtotal</p>
                  <p className='text-xs'>{formatCurrency(summary.subTotal)}</p>
                </div>
                <div className='h-[1px] w-full bg-muted'></div>
                <div className='w-full flex justify-between items-center'>
                  <p className='text-xs text-muted-foreground'>Entrega</p>
                  <p className='text-xs text-destructive'>{summary.deliveryFee === 0 ? 'GRÁTIS' : formatCurrency(summary.deliveryFee)}</p>
                </div>
                <div className='h-[1px] w-full bg-muted'></div>
                <div className='w-full flex justify-between items-center'>
                  <p className='text-xs text-muted-foreground'>Descontos</p>
                  <p className='text-xs'>- {formatCurrency(summary.discounts)}</p>
                </div>
                <div className='h-[1px] w-full bg-muted'></div>
                <div className='w-full flex justify-between items-center'>
                  <p className='text-sm font-semibold'>Total</p>
                  <p className='text-sm font-semibold'>{formatCurrency(summary.total)}</p>
                </div>
              </CardContent>
            </Card>
            <Button
              size='lg'
              className='w-full'>
              Finalizar Pedido
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

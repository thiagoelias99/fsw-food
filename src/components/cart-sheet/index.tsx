'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CartContext } from '@/context/cart-context'
import { useContext } from 'react'
import { Button } from '../ui/button'
import LoginSection from '../side-menu/login-section'
import { X } from 'lucide-react'
import CartItem from './cart-item'


export default function CartSheet() {
  const { sheetOpenState, setSheetOpenState, products } = useContext(CartContext)

  return (
    <Sheet open={sheetOpenState} onOpenChange={setSheetOpenState}>
      <SheetContent className='w-[90%]'>
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
        <ul  className='list-none flex flex-col gap-2'>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>

  )
}

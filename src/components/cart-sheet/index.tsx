'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet'
import { CartContext } from '@/context/cart-context'
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Check, Loader2, X } from 'lucide-react'
import CartItem from './cart-item'
import { Card, CardContent } from '../ui/card'
import { formatCurrency } from '@/lib/format-currecy'
import { ScrollArea } from '@radix-ui/react-scroll-area'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import { createOrder } from '@/actions/create-order'
import { DialogClose } from '@radix-ui/react-dialog'

export default function CartSheet() {
  const {
    sheetOpenState,
    setSheetOpenState,
    products,
    summary,
    cartResetDialogState,
    setCartResetDialogState,
    resetCart,
    addProduct,
    productToAdd
  } = useContext(CartContext)

  const { data } = useSession()
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateOrder() {
    if (!data?.user) return

    try {
      setIsLoading(true)
      await createOrder(summary, products[0].restaurantId, products, data.user.id)
      // set a timeout of 1.5 seconds to simulate the order creation
      // await new Promise(resolve => setTimeout(resolve, 1500))

      resetCart()
      setSheetOpenState(false)
      setShowOrderSuccess(true)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
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
                className='w-full min-h-10'
                onClick={() => handleCreateOrder()}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='animate-spin mr-2' size={24} />}
                Finalizar Pedido
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={cartResetDialogState} onOpenChange={setCartResetDialogState}>
        <DialogContent className='w-[80%] rounded-lg'>
          <DialogHeader>
            <DialogTitle>Limpar sacola</DialogTitle>
            <DialogDescription>
              Para adicionar esse produto a sacola, será esvaziada a sacola atual . Deseja continuar?
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex justify-center items-center gap-4'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => setCartResetDialogState(false)}
            >
              Cancelar
            </Button>
            <Button
              className='w-full'
              onClick={() => {
                resetCart()
                setCartResetDialogState(false)
                if (productToAdd) addProduct(productToAdd)
              }}
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderSuccess} onOpenChange={setShowOrderSuccess}>
        <DialogContent className='w-[60%] rounded-lg flex flex-col justify-start items-center'>
          <div className='bg-primary rounded-full w-16 h-16 flex justify-center items-center'>
            <Check size={48} className='text-primary-foreground' />
          </div>
          <p className='font-semibold'>Pedido Efetuado!</p>
          <p className='text-sm text-muted-foreground text-center'>Seu pedido foi efetuado com sucesso.</p>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='border-muted w-full'
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}

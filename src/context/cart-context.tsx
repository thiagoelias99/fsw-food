'use client'

import { Prisma } from '@prisma/client'
import { createContext, useMemo, useReducer, useState } from 'react'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }> {
  quantity: number;
}

// Context
interface ICartSummary {
  subTotal: number
  discounts: number
  total: number
  totalItems: number
  deliveryFee: number
  deliveryTime: number
}

interface ICartContext {
  products: CartProduct[]
  summary: ICartSummary
  addProduct: (product: CartProduct) => void
  removeProduct: (id: string) => void
  updateProduct: (product: CartProduct) => void
  sheetOpenState: boolean
  setSheetOpenState: (state: boolean) => void
}


export const CartContext = createContext<ICartContext>({
  products: [],
  summary: {
    total: 0,
    totalItems: 0,
    subTotal: 0,
    discounts: 0,
    deliveryFee: 0,
    deliveryTime: 0
  },
  addProduct: () => { },
  removeProduct: () => { },
  updateProduct: () => { },
  sheetOpenState: false,
  setSheetOpenState: () => { }
})
CartContext.displayName = 'Cart'

// Reducer types
type CartAction =
  | { type: 'add'; product: CartProduct }
  | { type: 'remove'; productId: string }
  | { type: 'update'; product: CartProduct }

//Provider
export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [sheetOpenState, setSheetOpenState] = useState(false)
  const [cart, updateCart] = useReducer(cartReducer, [])

  function cartReducer(state: CartProduct[], action: CartAction): CartProduct[] {
    switch (action.type) {
      case 'add':
        if (!action.product) {
          return state
        }

        setSheetOpenState(true)

        const existingProduct = state.find((product) => product.id === action.product?.id)
        if (existingProduct) {
          return state.map((product) => {
            if (product.id === action.product?.id) {
              return {
                ...product,
                quantity: product.quantity + action.product?.quantity
              }
            }
            return product
          })
        }

        return [...state, action.product]
      case 'remove':
        return state.filter((product) => product.id !== action.productId)
      case 'update':
        return state.map((product) => {
          if (product.id === action.product.id) {
            return action.product
          }
          return product
        })
      default:
        return state
    }
  }

  const cartSummary: ICartSummary = useMemo(() => {
    const subTotal = cart.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0)
    const discounts = cart.reduce((acc, product) => acc + Number(product.price) * product.discountPercentage / 100 * product.quantity, 0)
    const deliveryFee = Number(cart[0]?.restaurant.deliveryFee) || 0
    const deliveryTime = cart[0]?.restaurant.deliveryTimeMinutes || 0

    const total = subTotal - discounts + deliveryFee

    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0)
    

    return { total, totalItems, subTotal, discounts, deliveryFee, deliveryTime }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        products: cart,
        summary: cartSummary,
        addProduct: (product: CartProduct) => updateCart({ type: 'add', product }),
        removeProduct: (productId: string) => updateCart({ type: 'remove', productId }),
        updateProduct: (product: CartProduct) => updateCart({ type: 'update', product }),
        sheetOpenState,
        setSheetOpenState
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
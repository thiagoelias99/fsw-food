'use client'

import { Prisma } from '@prisma/client'
import { createContext, useMemo, useReducer } from 'react'

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
}

interface ICartContext {
  products: CartProduct[]
  summary: ICartSummary
  addProduct: (product: CartProduct) => void
  removeProduct: (id: string) => void
  updateProduct: (product: CartProduct) => void
}


export const CartContext = createContext<ICartContext>({
  products: [],
  summary: { 
    total: 0, 
    totalItems: 0,
    subTotal: 0,
    discounts: 0
  },
  addProduct: () => { },
  removeProduct: () => { },
  updateProduct: () => { },
})
CartContext.displayName = 'Cart'

// Reducer types
type CartAction =
  | { type: 'add'; product: CartProduct }
  | { type: 'remove'; productId: string }
  | { type: 'update'; product: CartProduct }

//Provider
export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, updateCart] = useReducer(cartReducer, [])

  function cartReducer(state: CartProduct[], action: CartAction): CartProduct[] {
    switch (action.type) {
      case 'add':
        if (!action.product) {
          return state
        }
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
    const total = subTotal - discounts

    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0)
    
    return { total, totalItems, subTotal, discounts }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        products: cart,
        summary: cartSummary,
        addProduct: (product: CartProduct) => updateCart({ type: 'add', product }),
        removeProduct: (productId: string) => updateCart({ type: 'remove', productId }),
        updateProduct: (product: CartProduct) => updateCart({ type: 'update', product }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
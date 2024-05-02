'use client'

import { Prisma } from '@prisma/client'
import { createContext, useReducer } from 'react'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }> {
  quantity: number;
}

// Context
interface ICartContext {
  products: CartProduct[]
  addProduct: (product: CartProduct) => void
  removeProduct: (id: string) => void
  updateProduct: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
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

  return (
    <CartContext.Provider
      value={{
        products: cart,
        addProduct: (product: CartProduct) => updateCart({ type: 'add', product }),
        removeProduct: (productId: string) => updateCart({ type: 'remove', productId }),
        updateProduct: (product: CartProduct) => updateCart({ type: 'update', product }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const useStore = create(
    persist(
        (set) => ({
            cartProducts: [],
            transactionRef: null,

            addToCart: (item) => set((state) =>
            ({
                cartProducts: [...state.cartProducts, item]
            })),

            addTransactionReference: (item) => set((state) =>
            ({
                transactionRef: item
            })),

            addProduct: (item) => set((state) =>
            ({
                cartProducts: [...state.cartProducts, item]
            })),

            removeProduct: (itemId) =>
                set((state) => ({

                    cartProducts: [
                        ...state.cartProducts.slice(0, itemId),
                        ...state.cartProducts.slice(itemId + 1)
                    ]



                })),


            clearCart: (item) => set((state) =>
            ({
                cartProducts: []
            })),
        }),

        {
            name: 'CartInfo',
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },

    ))

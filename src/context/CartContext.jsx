import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    getTotalPrice: () => 0
})

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        setCart(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id)
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            } else {
                return [...prevItems, {...product, quantity: 1}]
            }
        })
    }
    const removeFromCart = (productId) => {
        setCart(prevItems => prevItems.filter(item => item.id !== productId))
    }

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1)
            return
        setCart(prevItems =>
            prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, getCartCount, updateQuantity, clearCart, getTotalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

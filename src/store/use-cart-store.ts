import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CartItem {
    id: string;
    title: string;
    price: number;
    imageCover: string;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, type: 'plus' | 'minus') => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const currentCart = get().cart;
                const existingItem = currentCart.find((item) => item.id === product.id);

                if (existingItem) {
                    // If product already in cart, just increment quantity
                    set({
                        cart: currentCart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ cart: [...currentCart, { ...product, quantity: 1 }] });
                }
            },
            updateQuantity: (id: string, type: 'plus' | 'minus') => {
                const currentCart = get().cart;
                const updatedCart = currentCart.map((item) => {
                    if (item.id === id) {
                        const newQuantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                }).filter(item => item.quantity > 0);

                set({ cart: updatedCart });
            },
            removeFromCart: (id: string) => {
                set({ cart: get().cart.filter((item) => item.id !== id) });
            },

            clearCart: () => set({ cart: [] }),

            totalPrice: () => {
                return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        { name: 'cart-storage' }
    )
);
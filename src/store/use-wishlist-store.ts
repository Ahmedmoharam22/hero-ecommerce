import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string };
  ratingsAverage: number;
}

interface WishlistState {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.find((item) => item.id === product.id);

        if (isExist) {
          set({ wishlist: currentWishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    { name: 'wishlist-storage' }
  )
);
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/src/store/use-cart-store";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCartStore();

  const handleRemoveItem = (id: string, title: string) => {
    removeFromCart(id);
    toast.error(`${title.slice(0, 20)}... removed from cart`, {
      icon: '🗑️',
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared successfully");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6 text-slate-200">
          <ShoppingBag size={100} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet. Start shopping now and discover our amazing deals!
        </p>
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-lg rounded-full transition-all hover:shadow-lg">
            Return to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
        <span className="text-slate-500 font-medium">{cart.length} Items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Product Image */}
              <div className="relative h-32 w-full sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2">
                <Image 
                  src={item.imageCover} 
                  alt={item.title} 
                  fill 
                  className="object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-indigo-600 font-black">${item.price}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full"
                    onClick={() => handleRemoveItem(item.id, item.title)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-6">
                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-600 hover:text-indigo-600"
                      onClick={() => updateQuantity(item.id, 'minus')}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} strokeWidth={3} />
                    </Button>
                    
                    <span className="text-sm font-black w-8 text-center text-slate-900">
                      {item.quantity}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-600 hover:text-indigo-600"
                      onClick={() => updateQuantity(item.id, 'plus')}
                    >
                      <Plus size={14} strokeWidth={3} />
                    </Button>
                  </div>

                  <p className="font-black text-slate-900 text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-start pt-4">
            <Button 
              variant="outline" 
              className="text-slate-500 hover:text-red-600 border-dashed"
              onClick={handleClearCart}
            >
              Clear Entire Cart
            </Button>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Estimated Shipping</span>
                <span className="text-green-600 font-bold tracking-tight uppercase text-xs p-1 bg-green-50 rounded">Free</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Tax</span>
                <span className="text-slate-900">$0.00</span>
              </div>
              
              <Separator className="bg-slate-100" />
              
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold text-slate-900">Total Price</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-indigo-600 leading-none">
                    ${totalPrice().toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Including VAT</p>
                </div>
              </div>
            </div>

            <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl gap-3 shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95">
              Proceed to Checkout <ArrowRight size={20} />
            </Button>
            
            <p className="text-center text-xs text-slate-400 font-medium">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
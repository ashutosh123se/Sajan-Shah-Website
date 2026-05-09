import { useCartStore } from '@/store/cartStore';

export const useCart = () => {
  const {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const addToCart = (product: any, quantity = 1) => {
    addItem(product, quantity);
  };

  const removeFromCart = (productId: string) => {
    removeItem(productId);
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const clearAllItems = () => {
    clearCart();
  };

  const openCart = () => {
    if (!isOpen) {
      toggleCart();
    }
  };

  const closeCart = () => {
    if (isOpen) {
      toggleCart();
    }
  };

  return {
    items,
    isOpen,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearAllItems,
    openCart,
    closeCart,
    toggleCart,
    getTotalItems,
    getTotalPrice,
  };
};

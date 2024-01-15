import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: string, quantity: number) => {
    // Hämta aktuell varukorg
    const currentCart = [...cartItems];
  
    // Lägg till den nya produkten i varukorgen eller öka antalet om den redan finns
    const existingItemIndex = currentCart.findIndex(item => item.productId === productId);
  
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({ productId, quantity });
    }
  
    // Uppdatera varukorgen med den nya varan
    setCartItems(currentCart);
  };

  useEffect(() => {
    console.log('Fetching cart from localStorage');
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (JSON.stringify(parsedCart) !== JSON.stringify(cartItems)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error parsing stored cart:', error);
        localStorage.removeItem('cart');
        setCartItems([]);
      }
    }
  }, []);

  // Uppdatera localStorage när varukorgen ändras
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

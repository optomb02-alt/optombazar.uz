'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Category } from '@/types';
import { CATEGORIES } from '@/constants';

interface StoreContextType {
    // Products (fetched from API)
    products: Product[];
    setProducts: (products: Product[]) => void;
    loading: boolean;

    // Cart
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartItemCount: number;

    // Favorites
    favorites: string[];
    toggleFavorite: (productId: string) => void;

    // Categories
    categories: Category[];
    getCategoryById: (id: string) => Category | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Load cart and favorites from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('optombazar_cart');
        const savedFavorites = localStorage.getItem('optombazar_favorites');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('optombazar_cart', JSON.stringify(cart));
    }, [cart]);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('optombazar_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateCartQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const toggleFavorite = (productId: string) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const getCategoryById = (id: string) => {
        return CATEGORIES.find((cat) => cat.id === id);
    };

    return (
        <StoreContext.Provider
            value={{
                products,
                setProducts,
                loading,
                cart,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
                cartTotal,
                cartItemCount,
                favorites,
                toggleFavorite,
                categories: CATEGORIES,
                getCategoryById,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

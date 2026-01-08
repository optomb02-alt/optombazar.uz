'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Category } from '@/types';
import { CATEGORIES } from '@/constants';

interface StoreContextType {
    // Products (fetched from API)
    products: Product[];
    setProducts: (products: Product[]) => void;
    loading: boolean;
    blogPosts: any[];

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

    // User Profile
    user: any;
    updateUserProfile: (profile: any) => void;

    // Orders
    orders: any[];

    // Categories
    categories: Category[];
    getCategoryById: (id: string) => Category | undefined;

    // Orders
    placeOrder: (order: any) => Promise<boolean>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load cart and favorites from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('optombazar_cart');
        const savedFavorites = localStorage.getItem('optombazar_favorites');
        const savedUser = localStorage.getItem('optombazar_user');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('optombazar_cart', JSON.stringify(cart));
    }, [cart]);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('optombazar_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Save user to localStorage
    useEffect(() => {
        if (user) localStorage.setItem('optombazar_user', JSON.stringify(user));
    }, [user]);

    // Fetch products from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, blogRes, ordersRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/blog'),
                    fetch('/api/orders')
                ]);

                if (productsRes.ok) setProducts(await productsRes.json());
                if (blogRes.ok) setBlogPosts(await blogRes.json());
                if (ordersRes.ok) setOrders(await ordersRes.json());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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

    const placeOrder = async (order: any) => {
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            if (res.ok) {
                clearCart();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error placing order:', error);
            return false;
        }
    };

    return (
        <StoreContext.Provider
            value={{
                products,
                setProducts,
                loading,
                blogPosts,
                cart,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
                cartTotal,
                cartItemCount,
                favorites,
                toggleFavorite,
                user,
                updateUserProfile: setUser,
                orders,
                categories: CATEGORIES,
                getCategoryById,
                placeOrder,
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

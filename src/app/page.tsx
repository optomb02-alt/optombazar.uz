import { Metadata } from 'next';
import { getProducts } from '@/lib/db';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Bosh Sahifa',
  description: "Eng arzon ulgurji narxlarda paketlar, bir martalik idishlar va xo'jalik mollari. Toshkent bo'ylab yetkazib berish xizmati.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch products on server side for SEO
  const products = await getProducts();

  return <HomeClient initialProducts={products as any[]} />;
}

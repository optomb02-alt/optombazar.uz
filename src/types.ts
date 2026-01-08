
export type Language = 'uz' | 'ru';

// Hierarchical Category Structure
export interface Category {
  id: string;
  name_uz: string;
  name_ru: string;
  parent_id: string | null; // null = main category, string = subcategory
  icon?: string;
}

export interface Product {
  id: string;
  slug: string; // URL-friendly unique identifier
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  price: number; // Price per pack
  items_per_pack: number;
  stock: number;
  images: string[]; // Changed from single image_url to array
  video_url?: string;
  category: string; // Category ID
}

export interface CartItem {
  product: Product;
  quantity: number; // Number of packs
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  interest: string;
  registered_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  address: string; // New field
  location?: Location; // New optional field for coords
  items: CartItem[];
  total_amount: number;
  delivery_method: 'pickup' | 'delivery' | 'regional_mail' | 'yandex';
  payment_method: 'cash' | 'card' | 'transfer';
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title_uz: string;
  title_ru: string;
  content_uz: string; // HTML or Markdown
  content_ru: string;
  summary_uz: string;
  summary_ru: string;
  image_url: string;
  tags: string[];
  created_at: string;
  views: number;
}

export interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
  };
}
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Lazy-loaded SQL connection
let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql() {
    if (_sql) return _sql;

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
        return null;
    }

    _sql = neon(DATABASE_URL);
    return _sql;
}

// Get all products from database
export async function getProducts() {
    const sql = getSql();
    if (!sql) return [];

    try {
        const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Get single product by slug or ID
export async function getProductBySlug(slug: string) {
    const sql = getSql();
    if (!sql) return null;

    try {
        const products = await sql`
      SELECT * FROM products 
      WHERE slug = ${slug} OR id::text = ${slug}
      LIMIT 1
    `;
        return products[0] || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Get all blog posts
export async function getBlogPosts() {
    const sql = getSql();
    if (!sql) return [];

    try {
        const posts = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string) {
    const sql = getSql();
    if (!sql) return null;

    try {
        const posts = await sql`
      SELECT * FROM blog_posts 
      WHERE slug = ${slug} OR id::text = ${slug}
      LIMIT 1
    `;
        return posts[0] || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

// Get all orders
export async function getOrders() {
    const sql = getSql();
    if (!sql) return [];

    try {
        const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// Create new order
export async function createOrder(order: {
    customer_name: string;
    customer_phone: string;
    address?: string;
    delivery_method?: string;
    payment_method?: string;
    total_amount: number;
    items: any[];
}) {
    const sql = getSql();
    if (!sql) throw new Error('Database not configured');

    try {
        const result = await sql`
      INSERT INTO orders (customer_name, customer_phone, address, delivery_method, payment_method, total_amount, items, status)
      VALUES (${order.customer_name}, ${order.customer_phone}, ${order.address || ''}, ${order.delivery_method || 'pickup'}, ${order.payment_method || 'cash'}, ${order.total_amount}, ${JSON.stringify(order.items)}, 'pending')
      RETURNING *
    `;
        return result[0];
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

// Get all users
export async function getUsers() {
    const sql = getSql();
    if (!sql) return [];

    try {
        const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

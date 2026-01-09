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
// Product management
export async function addProduct(product: any) {
    const sql = getSql();
    if (!sql) throw new Error('Database not configured');

    try {
        console.log('Adding product with data:', JSON.stringify(product, null, 2));
        // Format images as PostgreSQL text[] array literal
        const imagesArray = product.images || [];
        const imagesLiteral = `{${imagesArray.map((img: string) => `"${img.replace(/"/g, '\\"')}"`).join(',')}}`;
        const result = await sql`
            INSERT INTO products (name_uz, name_ru, description_uz, description_ru, slug, price, items_per_pack, stock, images, video_url, category)
            VALUES (${product.name_uz || ''}, ${product.name_ru || ''}, ${product.description_uz || ''}, ${product.description_ru || ''}, ${product.slug}, ${Number(product.price) || 0}, ${Number(product.items_per_pack) || 0}, ${Number(product.stock) || 0}, ${imagesLiteral}::text[], ${product.video_url || ''}, ${product.category || ''})
            RETURNING *
        `;
        return result[0];
    } catch (error: any) {
        console.error('Error in addProduct SQL:', error);
        throw error;
    }
}

export async function updateProduct(product: any) {
    const sql = getSql();
    if (!sql) throw new Error('Database not configured');

    try {
        console.log('Updating product with data:', JSON.stringify(product, null, 2));
        // Format images as PostgreSQL text[] array literal
        const imagesArray = product.images || [];
        const imagesLiteral = `{${imagesArray.map((img: string) => `"${img.replace(/"/g, '\\"')}"`).join(',')}}`;
        const result = await sql`
            UPDATE products 
            SET name_uz = ${product.name_uz || ''}, name_ru = ${product.name_ru || ''}, description_uz = ${product.description_uz || ''}, description_ru = ${product.description_ru || ''}, 
                slug = ${product.slug}, price = ${Number(product.price) || 0}, items_per_pack = ${Number(product.items_per_pack) || 0}, stock = ${Number(product.stock) || 0}, 
                images = ${imagesLiteral}::text[], video_url = ${product.video_url || ''}, category = ${product.category || ''}
            WHERE id = ${product.id}
            RETURNING *
        `;
        return result[0];
    } catch (error: any) {
        console.error('Error in updateProduct SQL:', error);
        throw error;
    }
}

export async function deleteProduct(id: string) {
    const sql = getSql();
    if (!sql) throw new Error('Database not configured');

    try {
        // First delete from favorites/cart if there are foreign keys, 
        // but in our schema we use JSON or separate local storage mostly.
        // If there's a many-to-many table, it should be handled here.
        await sql`DELETE FROM products WHERE id = ${id}`;
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Order management
export async function updateOrderStatus(id: string, status: string) {
    const sql = getSql();
    if (!sql) throw new Error('Database not configured');

    try {
        const result = await sql`
            UPDATE orders SET status = ${status} WHERE id = ${id} RETURNING *
        `;
        return result[0];
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

// Categories
export async function getCategories() {
    const sql = getSql();
    if (!sql) return [];

    try {
        const categories = await sql`SELECT * FROM categories ORDER BY id ASC`;
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

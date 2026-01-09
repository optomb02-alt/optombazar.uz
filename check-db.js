const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

function getDbUrl() {
    const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
    const match = envContent.match(/DATABASE_URL=["']?([^"'\s]+)["']?/);
    return match ? match[1] : null;
}

const DATABASE_URL = getDbUrl();

async function checkSchema() {
    const sql = neon(DATABASE_URL);
    try {
        const columns = await sql`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'products'
            ORDER BY ordinal_position
        `;
        console.log('PRODUCTS COLUMNS:', JSON.stringify(columns, null, 2));

        const constraints = await sql`
            SELECT conname, contype
            FROM pg_constraint
            JOIN pg_class ON pg_class.oid = pg_constraint.conrelid
            WHERE relname = 'products';
        `;
        console.log('CONSTRAINTS:', JSON.stringify(constraints, null, 2));

        const products = await sql`SELECT * FROM products LIMIT 1`;
        console.log('FIRST PRODUCT SAMPLES:', JSON.stringify(products, null, 2));
    } catch (err) {
        console.error('ERROR:', err);
    }
}

checkSchema();

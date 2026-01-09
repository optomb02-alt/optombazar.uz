const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Server-side price formatter to ensure consistent "12 000" style
function formatPrice(num: number | undefined): string {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export async function sendTelegramNotification(message: string) {
    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('Telegram credentials not found. Notification skipped.');
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Telegram API error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return false;
    }
}

// Format order data into a readable Telegram message
export function formatOrderMessage(order: any): string {
    const items = order.items.map((item: any, i: number) => {
        const totalLinePrice = (item.quantity * item.price) || 0;
        return `${i + 1}. <b>${item.product?.name_uz || item.name_uz}</b>\n   └ ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(totalLinePrice)} UZS`;
    }).join('\n\n');

    // Manzil ichidan koordinatalarni ajratib olish
    let locationLink = '';
    let addressText = order.address || 'Keltirilmagan';

    // Check if address explicitly contains Google Maps link
    if (addressText.includes('http')) {
        const match = addressText.match(/(https?:\/\/[^\s]+)/);
        if (match) {
            locationLink = `\n📍 <a href="${match[1]}">Xaritada ko'rish</a>`;
            addressText = addressText.replace(match[1], '').replace('🔗', '').trim();
        }
    }

    const deliveryCost = order.delivery_method === 'delivery' ? 30000 : 0;
    const totalAmount = order.total_amount || 0;

    // Sana va vaqt
    const orderDate = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
<b>🆕 YANGI BUYURTMA #${String(order.id).slice(-6)}</b>
➖➖➖➖➖➖➖➖
👤 <b>Mijoz:</b> ${order.customer_name}
📞 <b>Tel:</b> ${order.customer_phone}
🏠 <b>Manzil:</b> ${addressText}${locationLink}

🛒 <b>Buyurtma tarkibi:</b>
${items}
➖➖➖➖➖➖➖➖
🚚 <b>Yetkazish:</b> ${order.delivery_method === 'delivery' ? '30 000 UZS' : 'Olib ketish (0 UZS)'}
💰 <b>JAMI: ${formatPrice(totalAmount)} UZS</b>
💳 <b>To'lov:</b> ${order.payment_method === 'cash' ? 'Naqd' : 'Karta (Click/Payme)'}
📅 <b>Vaqt:</b> ${orderDate}
    `.trim();
}

/**
 * Telegram Bot API utility for sending notifications
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

/**
 * Formats order data into a readable Telegram message
 */
export function formatOrderMessage(order: any): string {
    const items = order.items.map((item: any) =>
        `• ${item.product?.name_uz || item.name_uz} x ${item.quantity}`
    ).join('\n');

    return `
🚀 <b>Yangi Buyurtma!</b> # ${order.id?.slice(-6) || 'Noma\'lum'}

👤 <b>Mijoz:</b> ${order.customer_name}
📞 <b>Telefon:</b> ${order.customer_phone}
📍 <b>Manzil:</b> ${order.address || 'Ko\'rsatilmagan'}

🛍 <b>Mahsulotlar:</b>
${items}

💰 <b>Jami:</b> ${order.total_amount.toLocaleString()} UZS
💳 <b>To'lov:</b> ${order.payment_method}
🚚 <b>Yetkazish:</b> ${order.delivery_method}

📅 ${new Date().toLocaleString('uz-UZ')}
    `.trim();
}

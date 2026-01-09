import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder, updateOrderStatus } from '@/lib/db';
import { sendTelegramNotification, formatOrderMessage } from '@/lib/telegram';

export async function GET() {
    try {
        const orders = await getOrders();
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const order = await createOrder(body);

        // Send Telegram Notification
        try {
            const message = formatOrderMessage(order);
            await sendTelegramNotification(message);
        } catch (tgError) {
            console.error('Failed to send Telegram notification:', tgError);
        }

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json(); // { id, status }
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
        }

        const updatedOrder = await updateOrderStatus(id, status);
        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

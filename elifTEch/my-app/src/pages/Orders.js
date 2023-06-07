import React from 'react';
import './pages.css'

function Orders({ orders }) {
    return (
        <div className='coupons-wrapper'>
        {orders === null || orders.length === 0 ? "Нет заказов" : orders.map((order, idx) => (
            <div key={order.id} className='order'>
                order: {idx+1}
                <div>
                    <span>Order ID:</span> {order.id}
                </div>
                <div>
                    <span>Order Total Cost:</span> {order.totalCost}$
                </div>
                <div>
                    <span>User Name:</span> {order.name}
                </div>
            </div>
        ))}
        </div>
    );
};

export default Orders;

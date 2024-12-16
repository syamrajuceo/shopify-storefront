import React from "react";
import { ShoppingBag } from "lucide-react";

// OrderStatusBadge Component
const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    delivered: {
      icon: () => <span>✓</span>,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    shipped: {
      icon: () => <span>🚚</span>,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    processing: {
      icon: () => <span>⏳</span>,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full ${statusConfig[status].bg}`}
    >
      <StatusIcon className={`w-4 h-4 ${statusConfig[status].color} mr-2`} />
      <span className={`text-sm font-medium ${statusConfig[status].color}`}>
        {status}
      </span>
    </div>
  );
};

// OrderItem Component
const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-cover rounded-md"
    />
    <div className="flex-1">
      <h4 className="font-medium">{item.name}</h4>
      <p className="text-gray-500">Quantity: {item.quantity}</p>
    </div>
    <p className="font-medium">${item.price.toFixed(2)}</p>
  </div>
);

// OrderCard Component
const OrderCard = ({ orderId, date, status, items, total }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">Order #{orderId}</h3>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <OrderStatusBadge status={status} />
    </div>
    <div className="space-y-4">
      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-lg">${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

// Sample data
const orders = [
  {
    orderId: "ORD-2024-001",
    date: "March 15, 2024",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
      },
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
      },
    ],
    total: 329.98,
  },
  {
    orderId: "ORD-2024-002",
    date: "March 14, 2024",
    status: "shipped",
    items: [
      {
        id: "3",
        name: "Running Shoes",
        price: 89.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
      },
    ],
    total: 89.99,
  },
  {
    orderId: "ORD-2024-003",
    date: "March 13, 2024",
    status: "processing",
    items: [
      {
        id: "4",
        name: "Laptop Backpack",
        price: 59.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
      },
      {
        id: "5",
        name: "Water Bottle",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80",
      },
    ],
    total: 109.97,
  },
];


const Orderpage = () => (
  <div className="min-h-screen bg-gray-50">
    
    {/* Main Content */}
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">In Transit</p>
            <p className="text-2xl font-bold">
              {orders.filter((order) => order.status === "shipped").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Delivered</p>
            <p className="text-2xl font-bold">
              {orders.filter((order) => order.status === "delivered").length}
            </p>
          </div>
        </div>
        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              orderId={order.orderId}
              date={order.date}
              status={order.status}
              items={order.items}
              total={order.total}
            />
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default Orderpage;

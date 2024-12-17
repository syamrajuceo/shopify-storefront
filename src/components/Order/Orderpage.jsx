import React from "react";
import { ShoppingBag } from "lucide-react";
import { fetchOrders } from "../../store/orders";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// OrderStatusBadge Component
const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    FULFILLED: {
      icon: () => <span>✓</span>,
      bg: "bg-green-100",
      color: "text-green-600",
      status: "delivered",
    },
    UNFULFILLED: {
      icon: () => <span>🚚</span>,
      bg: "bg-blue-100",
      color: "text-blue-600",
      status: "pending",
    },
    processing: {
      icon: () => <span>⏳</span>,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
  };

  const StatusIcon = statusConfig[status]?.icon;

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full ${statusConfig[status]?.bg}`}
    >
      <StatusIcon className={`w-2 h-4 ${statusConfig[status]?.color} mr-2`} />
      <span className={`text-sm font-medium ${statusConfig[status]?.color}`}>
        {statusConfig[status]?.status}
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
      className="w-16 h-16 object-contain rounded-md"
    />
    <div className="flex-1">
      <h4 className="font-medium">{item.title}</h4>
      <p className="text-gray-500">Quantity: {item.quantity}</p>
      <p className="font-medium">
        {item?.compareAtPrice?.currencyCode} {item?.compareAtPrice?.amount}
      </p>
    </div>
  </div>
);

// OrderCard Component
const OrderCard = ({ orderId, date, status, items, total,Id }) => (
  <Link to={`/profile?activetab=ordersummary&id=${Id}`}>
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h3 className="text-sm font-semibold">Order id: {orderId}</h3>
          <p className="text-gray-500 text-sm">
            {format(new Date(date), "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
        <OrderStatusBadge status={status} />
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold text-lg">
            {total?.currencyCode} {total?.amount}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// Fetch orders
const orders = await fetchOrders();


// OrderPage Component
const OrderPage = () => (
  <div className="bg-gray-50">
    {/* Main Content */}
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Orders List */}
        <div className="space-y-4">
          {orders.length <= 0 ? (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="bg-gray-300 h-20"></div>
            </div>
          ) : (
            orders.map((order, index) => (
              <OrderCard
                key={index}
                orderId={order?.name}
                Id={order?.id}
                date={order?.processedAt}
                status={order?.fulfillmentStatus}
                items={order?.items}
                total={order?.totalPrice}
              />
            ))
          )}
        </div>
      </div>
    </main>
  </div>
);

export default OrderPage;

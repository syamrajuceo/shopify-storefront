import React, { useState, useEffect } from "react";
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
    PROCESSING: {
      icon: () => <span>⏳</span>,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
      status: "processing",
    },
  };

  const currentConfig =
    statusConfig[status?.toUpperCase()] || statusConfig.UNFULFILLED;
  const StatusIcon = currentConfig.icon;

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full ${currentConfig.bg}`}
    >
      <StatusIcon className={`w-4 h-4 ${currentConfig.color} mr-2`} />
      <span className={`text-sm font-medium ${currentConfig.color}`}>
        {currentConfig.status}
      </span>
    </div>
  );
};

// OrderItem Component
const OrderItem = ({ item }) => (
  <div className="flex items-center space-x-4">
    <img
      src={item?.image || "https://via.placeholder.com/64"}
      alt={item?.name || "Product"}
      className="w-16 h-16 object-contain rounded-md"
    />
    <div className="flex-1">
      <h4 className="font-medium">{item?.title || "Untitled Product"}</h4>
      <p className="text-gray-500">Quantity: {item?.quantity || 0}</p>
      <p className="font-medium">
        {item?.compareAtPrice?.currencyCode || "$"}{" "}
        {item?.compareAtPrice?.amount || "0.00"}
      </p>
    </div>
  </div>
);

// OrderCard Component
const OrderCard = ({ orderId, date, status, items = [], total, Id }) => (
  <Link to={`/profile?activetab=ordersummary&id=${Id}`}>
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h3 className="text-sm font-semibold">Order id: {orderId}</h3>
          <p className="text-gray-500 text-sm">
            {date ? format(new Date(date), "yyyy-MM-dd HH:mm:ss") : "No Date"}
          </p>
        </div>
        <OrderStatusBadge status={status} />
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => <OrderItem key={index} item={item} />)
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold text-lg">
            {total?.currencyCode || "$"} {total?.amount || "0.00"}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// OrderPage Component
const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(""); // Error state
  const user = localStorage.getItem("user");
  useEffect(() => {
    const fetchOrderData = async () => {
      // if (user && user.email) {
        try {
          const fetchedOrders = await fetchOrders();
          setOrders(fetchedOrders || []);
        } catch (err) {
          setError(err.message || "An error occurred while fetching orders.");
        }
      // }
    };
    fetchOrderData();
  }, []);

  return (
    <div className="bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <div className="space-y-4">
            {orders.length <= 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <p className="text-center text-gray-500">No orders found</p>
              </div>
            ) : (
              orders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderId={order?.name || "N/A"}
                  Id={order?.id || ""}
                  date={order?.processedAt}
                  status={order?.fulfillmentStatus || "UNFULFILLED"}
                  items={order?.items || []}
                  total={order?.totalPrice}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderPage;

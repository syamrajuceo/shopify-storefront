import React, { useEffect, useState } from "react";
import { Package2, MapPin, Receipt, ChevronRight } from "lucide-react";
import { fetchOrders } from "../../store/orders";
import { useSearchParams } from "react-router-dom";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

const id = searchParams.get("id")
const order = orders.find((item) => item.id === id);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.message || "An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        { order ? (
          <>
            <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Package2 className="h-6 w-6 text-gray-700" />
            <h1 className="ml-3 text-lg font-semibold text-gray-900">Order Details</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Order ID */}
        <div className="text-sm text-gray-500 mb-6">
          Order ID - {order.name}
        </div>

        {/* Product Card */}

        {order.items.map((item) => (
  <div className="bg-white rounded-lg shadow mb-6" key={item.id || item.name}>
  <div className="p-4 sm:p-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
        {/* <p className="text-sm text-gray-500">Blue</p> */}
        <div className="mt-2 flex items-center">
          <span className="text-lg font-semibold">{item?.price?.currencyCode} {item?.price?.amount}</span>
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            QTY:{item.quantity}
          </span>
          <button className="ml-3 text-sm font-medium text-green-600 hover:text-green-500">
            Review
          </button>
        </div>
      </div>
      <img
        src={item?.image}
        alt="Marshall Speaker"
        className="w-24 h-24 object-contain rounded-lg "
      />
    </div>

    {/* Order Timeline */}
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-900">Ordered Confirmed</p>
            <p className="text-sm text-gray-500">2024-03-15</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-900">Shipped</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-900">Delivered</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
))}
       
        

        {/* Shipping Details */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Shipping Details</h3>
            </div>
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-900">{order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName} </p>
              {/* <p>Karuthedath, Nilambur, Malappuram, Kerala, 679334 </p> */}
              <p>{order?.shippingAddress?.address1}</p>
              <p>{order?.shippingAddress?.city},{order?.shippingAddress?.country},{order?.shippingAddress?.province}</p>
              <p>{order?.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <Receipt className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Price Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{order.totalPrice.currencyCode} {order.totalPrice.amount} </span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600">FREE</span>
              </div> */}
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">{order.totalPrice.currencyCode} {order.totalPrice.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Download Button */}
        {/* <button className="w-full mt-6 flex items-center justify-between bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow rounded-lg hover:bg-gray-50">
          <div className="flex items-center">
            <Receipt className="h-5 w-5 text-gray-400" />
            <span className="ml-2">Invoice Download</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button> */}
      </div>
    </div>
          </>
        ) : (
          <div>No order found with the specified ID.</div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;

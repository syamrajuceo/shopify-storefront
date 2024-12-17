import React, { useEffect, useState } from "react";
import { Package2, MapPin, Receipt, ChevronRight } from "lucide-react";
import { fetchOrders } from "../../store/orders";
import { useSearchParams } from "react-router-dom";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  
console.log(searchParams.toString())
const id = searchParams.get("id")
console.log('hey......................................',id); 
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

  const order = orders.find((item) => item.name== id);
  console.log('hey............................................',id)

  return (
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
        {order ? (
          <>
            <div className="text-sm text-gray-500 mb-6">
              Order ID - {order.id}
            </div>

            {/* Product Card */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {order.productName}
                    </h2>
                    <p className="text-sm text-gray-500">{order.productColor}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-lg font-semibold">₹{order.price}</span>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        QTY: {order.quantity}
                      </span>
                      <button className="ml-3 text-sm font-medium text-green-600 hover:text-green-500">
                        Review
                      </button>
                    </div>
                  </div>
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
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

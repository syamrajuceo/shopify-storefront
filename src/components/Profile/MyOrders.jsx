import OrdersPage from "../../pages/OrdersPage";

function MyOrders({ }) {
    
    // const orders = []; 
  
    return (
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <OrdersPage/>
        {/* {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={index} className="p-4 bg-white shadow mb-4 rounded-md">
                <p>Order ID: {order.id}</p>
                <p>Total: {order.total}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    );
  }
  
  export default MyOrders;
  
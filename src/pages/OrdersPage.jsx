import React from 'react'
import OrderPage from '../components/Order/Orderpage.jsx'
import ScrollToTop from '../utils/ScrollToTop.jsx'
function OrdersPage() {
  ScrollToTop()
  return (
    <div>
      <OrderPage />
    </div>
  )
}

export default OrdersPage
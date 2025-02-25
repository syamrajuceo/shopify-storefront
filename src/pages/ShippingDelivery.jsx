import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="px-10 pt-8 pb-8 text-gray-800 max-w-auto mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping & Delivery</h1>
      
      <p className="mb-4 text-lg">
        We provide delivery services to major cities in the GCC and the US. For a detailed list of destinations, charges, and delivery times, please see below:
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Country Shipping</th>
              <th className="border border-gray-300 px-4 py-2">Fees Estimated</th>
              <th className="border border-gray-300 px-4 py-2">Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              { country: "UAE", fee: "Enjoy free delivery with our convenient Click and Collect service.", time: "Click and Collect" },
              { country: "Dubai", fee: "Orders placed before 10:00 am are eligible for same-day delivery. For locations beyond 25 kilometers, an additional 2 AED per kilometer fee applies.", time: "Delivery In 4 - 6 Hours" },
              { country: "UAE", fee: "Free Shipping on all Orders", time: "Delivery In 24-48 Hours" },
              { country: "KSA", fee: "Flat rate shipping of AED 60 to KSA", time: "Delivery In 4 - 7 Days" },
              { country: "Kuwait", fee: "Flat rate shipping of AED 60 to Kuwait", time: "Delivery In 4 - 7 Days" },
              { country: "Qatar", fee: "Flat rate shipping of AED 60 to Qatar", time: "Delivery In 4 - 7 Days" },
              { country: "Bahrain", fee: "Flat rate shipping of AED 60 to Bahrain", time: "Delivery In 4 - 7 Days" },
              { country: "Oman", fee: "Flat rate shipping of AED 60 to Oman", time: "Delivery In 4 - 7 Days" },
              { country: "US, Europe, and Australia", fee: "Flexible rate shipping as per region from AED 80 to US, Europe, and Australia & All over the world", time: "Delivery In 7 - 10 Days" }
            ].map((row, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">{row.country}</td>
                <td className="border border-gray-300 px-4 py-2">{row.fee}</td>
                <td className="border border-gray-300 px-4 py-2">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-gray-700 text-lg">
        <strong>NOTE:</strong> Prescription eyeglasses and special order contact lenses may require up to 2 days to 45 additional working days. This applies to all countries. Orders placed before 10:00 am are eligible for same-day delivery.
      </p>
    </div>
  );
};

export default ShippingDelivery;

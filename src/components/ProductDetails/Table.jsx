import React from "react";

export const TableComponent = ({ metafields = [] }) => {
  console.log("metafields.... : ", metafields);

  // Helper function to process the value
  const processValue = (field) => {
    if (field.namespace === "shopify" && Array.isArray(field.metavalue)) {
      // If `metavalue` is an array, extract handles or other relevant details
      return field.metavalue.map((meta) => meta.handle || "N/A").join(", ");
    }
    if (field.key === "shipping_to") {
      // Handle "Shipping To" metafield: ensure value is an array
      let shippingValues = field.value;

      // If value is a stringified array, parse it
      if (typeof shippingValues === "string") {
        try {
          shippingValues = JSON.parse(shippingValues);
        } catch (error) {
          console.error("Error parsing Shipping To field value:", error);
        }
      }

      // If parsed value is an array, join the values with commas
      if (Array.isArray(shippingValues)) {
        return shippingValues.join(", ");
      }
    }

    return field.value || "N/A"; // Default to field.value or "N/A" if undefined
  };

  // Filter relevant metafields: exclude null/undefined values and specific keys
  const filteredMetafields = metafields.filter(
    (field) =>
      field && // Ensure field is not null or undefined
      (field.namespace === "custom" || field.namespace === "shopify") &&
      field.value !== null &&
      field.value !== undefined &&
      field.key !== "free_delivery" &&
      field.key !== "express_delivery"
  );

  // Map metafields to table data format
  const tableData = filteredMetafields.map((field) => ({
    label: field.key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()), // Format key to be human-readable
    value: processValue(field), // Process the value based on namespace and structure
  }));

  return (
    <div className="w-full mx-auto mt-10">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                {row.label}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

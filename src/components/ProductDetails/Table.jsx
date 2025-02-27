import React from "react";

export const TableComponent = ({ metafields = [] }) => {
  const processValue = (field) => {
    if (field.namespace === "shopify" && Array.isArray(field.metavalue)) {
      return field.metavalue.map((meta) => meta.handle || "N/A").join(", ");
    }
    if (field.key === "shipping_to") {
      let shippingValues = field.value;
      if (typeof shippingValues === "string") {
        try {
          shippingValues = JSON.parse(shippingValues);
        } catch (error) {
          console.error("Error parsing Shipping To field value:", error);
        }
      }
      if (Array.isArray(shippingValues)) {
        return shippingValues.join(", ");
      }
    }
    return field.value || "N/A";
  };

  const filteredMetafields = metafields.filter(
    (field) =>
      field &&
      (field.namespace === "custom" || field.namespace === "shopify") &&
      field.value !== null &&
      field.value !== undefined &&
      field.key !== "free_delivery" &&
      field.key !== "express_delivery"
  );

  const tableData = filteredMetafields.map((field) => {
    let formattedLabel = field.key
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (field.key.toLowerCase() === "country-of-origin") {
      formattedLabel = "Country of Origin";
    }

    return {
      label: formattedLabel,
      value: processValue(field),
    };
  });

  return (
    <div className="w-full mx-auto mt-10">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="border border-gray-300 px-4 py-2 font-semibold text-left capitalize">
                {row.label}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left capitalize">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

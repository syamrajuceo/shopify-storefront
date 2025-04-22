import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ type }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");

  const formatType = (type) => {
    if (type === "ContactLenses") return "Contact Lenses";
    return type.replace(/([A-Z])/g, " $1").trim();
  };

  const getDisplayParts = () => {
    const parts = ["Shop", "Eyewear"];

    switch (type) {
      case "gender":
        parts.push("Gender");
        if (query) {
          parts.push(
            query === "male" ? "Men" : query === "female" ? "Women" : "Unisex"
          );
        }
        break;
      case "brand":
      case "shape":
        parts.push(type.charAt(0).toUpperCase() + type.slice(1));
        if (query) {
          parts.push(query.replace(/-/g, " "));
        }
        break;
      default:
        if (type !== "ALL") {
          parts.push(formatType(type));
        }
    }

    return parts;
  };

  const parts = getDisplayParts();

  return (
    <div className="container mx-auto pb-3">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            {index === parts.length - 1 ? (
              <span className="text-gray-900 capitalize">{part}</span>
            ) : (
              <Link
                to="#"
                className="hover:text-purple-600 capitalize"
                onClick={(e) => e.preventDefault()}
              >
                {part}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;

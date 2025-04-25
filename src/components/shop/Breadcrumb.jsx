import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ type }) => {
  const { search, pathname } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");

  const formatType = (type) => {
    if (type === "ContactLenses") return "Contact Lenses";
    return type.replace(/([A-Z])/g, " $1").trim();
  };

  const getDisplayParts = () => {
    const parts = [
      { name: "Shop", path: "/shop" },
      { name: "Eyewear", path: "/shop" }
    ];

    switch (type) {
      case "gender":
        parts.push({ name: "Gender", path: "/shop/eyewear/gender" });
        if (query) {
          parts.push({
            name: query === "male" ? "Men" : query === "female" ? "Women" : "Unisex",
            path: `/shop/eyewear/gender?query=${query}`
          });
        }
        break;
      case "brand":
      case "shape":
        parts.push({
          name: type.charAt(0).toUpperCase() + type.slice(1),
          path: `/shop/eyewear/${type}`
        });
        if (query) {
          parts.push({
            name: query.replace(/-/g, " "),
            path: `/shop/eyewear/${type}?query=${query}`
          });
        }
        break;
      default:
        if (type !== "ALL") {
          parts.push({
            name: formatType(type),
            path: `/shop/eyewear/${type.toLowerCase()}`
          });
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
              <span className="text-gray-900 capitalize">{part.name}</span>
            ) : (
              <Link
                to={part.path}
                className="hover:text-purple-600 capitalize"
              >
                {part.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
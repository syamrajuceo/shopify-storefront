import React, { useEffect } from "react";
// import Navigation from "../components/shop/Navigation";
import Breadcrumb from "../components/shop/Breadcrumb";
import Sidebar from "../components/shop/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import CollectionComponent from "../components/Collection/Collection.component";

export const ProductListingPage = () => {
  const dispatch = useDispatch();
  const { products, status, filters } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);
  return (
    <>
      {/* <Navigation /> */}
      <Breadcrumb />
      {status === "loading" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar filters={filters} />
          <CollectionComponent products={products} status={status} />
        </div>
      </div>
    </>
  );
};

import { Stack } from "@mui/material";

import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import ScrollToTop from "../utils/ScrollToTop";

export const ProductDetailsPage = () => {
  ScrollToTop()
  return (
    <>
      <Stack direction={"row"} width={"100%"} alignItems={"center"} justifyContent={"center"}>
        {/* <SingleProductDtails/> */}
        <ProductDetails/>
      </Stack>
    </>
  );
};
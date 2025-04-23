import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { ProductCard } from "../productCard/ProductCard.jsx"; 

const CollectionComponent = ({ products, loading, loadingMore }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body1">
          We couldn't find any products matching your filters.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {loadingMore && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`loading-${index}`}>
              <Skeleton variant="rectangular" width="100%" height={300} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

CollectionComponent.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      featuredImage: PropTypes.shape({
        url: PropTypes.string,
      }),
      priceRange: PropTypes.shape({
        minVariantPrice: PropTypes.shape({
          amount: PropTypes.string,
          currencyCode: PropTypes.string,
        }),
      }),
    })
  ),
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
};

CollectionComponent.defaultProps = {
  products: [],
  loading: false,
  loadingMore: false,
};

export default CollectionComponent;
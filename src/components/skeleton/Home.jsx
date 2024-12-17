import React from "react";
import { Box, Skeleton, Grid, useMediaQuery, useTheme } from "@mui/material";

export const HomePageSkeleton = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMidScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box padding={{ xs: "20px", sm: "30px", md: "50px 60px" }}>
      {/* Banner Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={isSmallScreen ? "200px" : isMidScreen ? "300px" : "400px"}
        sx={{ borderRadius: "20px" }}
      />

      {/* Circular Skeletons */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mt={3}
        p={2}
        mb={1}
        flexWrap="nowrap"
        overflow="hidden"
      >
        {[...Array(isSmallScreen ? 3 : isMidScreen ? 4 : 5)].map((_, index) => (
          <Skeleton
            key={index}
            variant="circular"
            width={isSmallScreen ? 80 : isMidScreen ? 100 : 150}
            height={isSmallScreen ? 80 : isMidScreen ? 100 : 150}
          />
        ))}
      </Box>

      {/* Categories Skeleton */}
      <Grid
        container
        spacing={2}
        mt={2}
        mb={3}
        flexWrap="nowrap"
        display="flex"
        sx={{ overflowX: "auto" }}
      >
        {[...Array(isSmallScreen ? 2 : isMidScreen ? 3 : 4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        ))}
      </Grid>

      {/* Full-Width Banner Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={isMidScreen ? 250 : 300}
        sx={{ mt: 3 }}
      />

      {/* Smaller Banners Skeleton */}
      <Grid container spacing={2} mt={3}>
        {[...Array(isSmallScreen ? 2 : isMidScreen ? 3 : 4)].map((_, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        ))}
      </Grid>

      {/* Additional Banners Skeleton */}
      <Grid container spacing={2} mt={3}>
        {[...Array(isSmallScreen ? 1 : isMidScreen ? 1 : 2)].map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        ))}
      </Grid>

      {/* Repeated Small Banners Skeleton */}
      <Grid container spacing={2} mt={3}>
        {[...Array(isSmallScreen ? 2 : isMidScreen ? 3 : 4)].map((_, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

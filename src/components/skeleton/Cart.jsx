import React from "react";
import { Box, Skeleton, Grid } from "@mui/material";

export const CartPageSkeleton = () => {
  return (
    <Box padding={"50px 60px"}>
      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"start"}
        gap={2}
        mt={2}
        mb={"20px"}
      >
        <Grid display={"flex"} direction={"column"} width={"65%"} gap={"20px"}>
          <Skeleton variant="rectangular" width="100%" height="150px" />
          <Skeleton variant="rectangular" width="100%" height="150px" />
          <Skeleton variant="rectangular" width="100%" height="150px" />
        </Grid>
        <Grid
          width={"30%"}
          display={"flex"}
          alignItems={"flex-start"}
          direction={"column"}
          gap={"20px"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          <Skeleton variant="text" width="100%" height="20px" />
          <Skeleton variant="text" width="100%" height="20px" />
          <Skeleton variant="text" width="100%" height="20px" />
          <Skeleton variant="text" width="100%" height="20px" />
          <Skeleton variant="text" width="100%" height="20px" />
          <Skeleton variant="text" width="100%" height="50px" />
          <Skeleton variant="text" width="100%" height="100px" />
          <Skeleton variant="text" width="100%" height="100px" />
        </Grid>
      </Grid>

      <Skeleton variant="text" width="30%" height="30px" mt = {"40px"} />

      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        mt={"30px"}
      >
        <Skeleton variant="rectangular" width="20%" height={"200px"} />
        <Skeleton variant="rectangular" width="20%" height={"200px"} />
        <Skeleton variant="rectangular" width="20%" height={"200px"} />
        <Skeleton variant="rectangular" width="20%" height={"200px"} />
      </Grid>
    </Box>
  );
};

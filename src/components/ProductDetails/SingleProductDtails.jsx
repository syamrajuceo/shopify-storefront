import { Box, Stack, Typography } from "@mui/material";

export const SingleProductDtails = () => {
  return (
    <>
      <Box
        width={"100%"}
        // border={1}
        bgcolor={"#f3f3f3a9"}
        height={"100%"}
        display={"flex"}
        alignContent={"center"}
        justifyContent={"center"}
        padding={"5px"}
        position={"relative"}
      >
        <Box width={"30%"} height={"100%"}></Box>
        <Box
          width={"70%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <img
            className="w-full h-full object-cover"
            src="https://carltonlondon.co.in/cdn/shop/files/clsw232_3.jpg?v=1684318860"
            alt=""
          />
          <Stack
            spacing={2}
            direction={"row"}
            position={"absolute"}
            bottom={"20px"}
            // border={1}
            height={"50px"}
            padding={"10px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              width={"100px"}
              border={1}
              borderColor={"#ccc"}
              borderRadius={"5px"}
              height={"100%"}
            >
              <Typography variant="h6" fontSize={"17px"} color={"#000"}>
                -
              </Typography>
              <Typography variant="h6" fontSize={"17px"} color={"#000"}>
                1
              </Typography>
              <Typography variant="h6" fontSize={"17px"} color={"#000"}>
                +
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              width={"100%"}
            //   border={1}
              bgcolor={"#000000"}
              borderRadius={"5px"}
              height={"100%"}
              color={"#fff"}
            >
                <Typography variant="h6" fontSize={"17px"} color={"#ffffff"}>Add to cart</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box width={"100%"} border={1} height={"100%"}></Box>
    </>
  );
};
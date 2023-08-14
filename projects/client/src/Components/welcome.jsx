import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const Welcome = () => {
  return (
    <Box>
      <Flex w={"100vw"} h={"100vh"}>
        <Image src="https://drive.google.com/uc?export=view&id=1iqWK_2S46koKu2RShslpm-36KIfjorPb"></Image>
        <Stack mt={"300px"}>
          <Text fontWeight={"bold"} fontSize={"30px"}>
            Welcome to Magfirah
          </Text>
          <Text fontWeight={"bold"} fontSize={"50px"}>
            Attendance System
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};
export default Welcome;

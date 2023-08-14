import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/AuthReducer";
import CreateEmployee from "./createEmployee";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          Attendence System
        </Text>
        <Flex gap={"20px"}>
          {user.Role.role === "admin" && <CreateEmployee />}
          <Button onClick={handleLogout} mr={"20px"}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

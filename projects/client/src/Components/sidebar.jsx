import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Welcome from "./welcome";
import HistoryWork from "./HistoryWork";
import DashBoardEmployee from "./DashBoardEmployee";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Salary from "./Salary";

export const Sidebar = () => {
  const [activePage, setActivePage] = useState("welcome");
  const user = useSelector((state) => state.AuthReducer.user);

  const renderPage = () => {
    switch (activePage) {
      case "welcome":
        return <Welcome />;
      case "CheckIn & Out":
        return <DashBoardEmployee />;
      case "history":
        return <Salary />;
      default:
        return null;
    }
  };
  return (
    <Box h={"100vh"}>
      <Box bgColor={"#33BBC5"} py={"20px"} pl={"20px"}>
        <Navbar />
      </Box>
      <Flex>
        <Stack bgColor={"gray.200"} h={"100vh"} pt={"100px"} gap={"20px"}>
          <Button
            variant={""}
            onClick={() => setActivePage("welcome")}
            _hover={{ bgColor: "#33BBC5" }}
          >
            Dashboard
          </Button>
          {user.Role.role === "karyawan" && (
            <Button
              _hover={{ bgColor: "#33BBC5" }}
              variant={""}
              onClick={() => setActivePage("CheckIn & Out")}
            >
              CheckIn & Out
            </Button>
          )}
          {user.Role.role === "admin" && (
            <Button
              _hover={{ bgColor: "#33BBC5" }}
              variant={""}
              onClick={() => setActivePage("history")}
            >
              History Work
            </Button>
          )}
        </Stack>
        <Box>{renderPage()}</Box>
      </Flex>
    </Box>
  );
};

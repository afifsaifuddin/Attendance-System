import {
  Box,
  Button,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Toast,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut } from "../redux/historyREducer";
import axios from "axios";

export default function DashBoardEmployee() {
  const [currentTime, setTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.AuthReducer.user);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleClockIn = () => {
    dispatch(clockIn(toast));
  };
  const handleClockOut = () => {
    dispatch(clockOut(toast));
  };

  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [attendence, setAttendence] = useState([]);
  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(`${URL_API}/attendence/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("respon", respon.data.history);
      setAttendence(respon.data.history);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("attendence", attendence);
  useEffect(() => {
    fetchHistory();
  }, [attendence]);
  return (
    <Stack h={"100vh"} w={"100vw"} align={"center"} mt={"20px"}>
      <Text fontWeight={"bold"}>
        {" "}
        {daysOfWeek[currentDate.getDay()]}, {currentDate.toLocaleDateString()}
      </Text>
      <Text fontWeight={"bold"}>{currentTime.toLocaleTimeString()} WITA</Text>
      <Flex gap={"20px"}>
        <Button
          leftIcon={<BiLogIn />}
          colorScheme="green"
          w={"300px"}
          onClick={handleClockIn}
        >
          Clock in
        </Button>
        <Button
          colorScheme="red"
          w={"300px"}
          rightIcon={<RiLogoutBoxRLine />}
          onClick={handleClockOut}
        >
          Clock out
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>ClockIn</Th>
            <Th>ClockOut</Th>
          </Tr>
        </Thead>
        <Tbody>
          {attendence.map((entry) => (
            <Tr key={entry.id}>
              <Td>{user.fullName}</Td>
              <Td>{new Date(entry.clockIn).toLocaleDateString()}</Td>
              <Td>
                {new Date(entry.clockIn).toLocaleTimeString([], {
                  timeStyle: "short",
                })}
              </Td>
              <Td>
                {entry.clockOut
                  ? new Date(entry.clockOut).toLocaleTimeString([], {
                      timeStyle: "short",
                    })
                  : "Not clocked out"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
}

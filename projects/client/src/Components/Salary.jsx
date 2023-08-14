import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function Salary() {
  const URL_API = process.env.REACT_APP_API_BASE_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL_API}/auth-management/auth/account`
        );
        setUsers(response.data.account);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //  hjgj
  const getRoleName = (roleID) => {
    switch (roleID) {
      case 1:
        return "Admin";
      case 2:
        return "Karyawan";
      default:
        return "Unknown";
    }
  };

  const filteredUsers = users.filter((user) => user.roleId === 2);

  return (
    <Flex w="100vw" pl="20px">
      <Box>
        <Stack>
          <Text fontSize="32px" fontWeight="bold">
            Salary Employee
          </Text>
          <Table w="90vw">
            <Thead>
              <Tr>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Birthday</Th>
                <Th>Role</Th>
                <Th>Base Salary</Th>
                <Th>Day Salary</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.fullName}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    {item.birthday
                      ? new Date(item.birthday).toLocaleDateString()
                      : ""}
                  </Td>
                  <Td>{getRoleName(item.roleId)}</Td>
                  <Td>{item.baseSalary}</Td>
                  <Td>{(item.baseSalary / 30).toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Box>
    </Flex>
  );
}

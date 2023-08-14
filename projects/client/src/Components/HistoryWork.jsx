import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { fetchHistory } from "../redux/historyREducer";

export const HistoryWork = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.HistoryReducer.history);
  console.log(history.userId);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Clock In</Th>
            <Th>Clock Out</Th>
            <Th>Hourly Work</Th>
            <Th>Day Salary</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map((entry) => (
            <Tr key={entry.id}>
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
              <Td>{entry.hourlyWork}</Td>
              <Td>{entry.hourlyWork / 30}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default HistoryWork;

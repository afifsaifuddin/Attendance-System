import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { registEmployee, getRole } from "../redux/AuthReducer";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export const CreateEmployee = () => {
  const { role } = useSelector((state) => state.AuthReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const createScheme = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    roleId: Yup.string().required("Role is required"),
    baseSalary: Yup.string().required("Base Salary is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      roleId: "",
      baseSalary: "",
      //   daySalary: "",
    },
    validationSchema: createScheme,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(registEmployee(values, setLoading, toast));
        formik.resetForm();
        onClose();
      } catch (error) {
        console.log("error submiting form", error);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleClick = () => {
    onOpen();
  };
  useEffect(() => {
    dispatch(getRole());
  }, []);
  return (
    <Box>
      <Button onClick={handleClick}> Create Employee</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>Create Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Email</Td>
                    <Td>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div style={{ color: "red" }}>
                          {formik.errors.email}
                        </div>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Role</Td>
                    <Td>
                      <Select
                        {...formik.getFieldProps("roleId")}
                        value={formik.values.roleId}
                        onChange={formik.handleChange}
                        name="roleId"
                        id="roleId"
                        placeholder="Select Role"
                      >
                        {role.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.role}
                          </option>
                        ))}
                      </Select>
                      {formik.touched.roleId && formik.errors.roleId && (
                        <div style={{ color: "red" }}>
                          {formik.errors.roleId}
                        </div>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Base Salary</Td>
                    <Td>
                      <input
                        type="number"
                        name="baseSalary"
                        id="baseSalary"
                        {...formik.getFieldProps("baseSalary")}
                        onChange={formik.handleChange}
                        value={formik.values.baseSalary}
                        placeholder="Base Salary"
                      />
                      {formik.touched.baseSalary &&
                        formik.errors.baseSalary && (
                          <div style={{ color: "red" }}>
                            {formik.errors.baseSalary}
                          </div>
                        )}
                    </Td>
                  </Tr>
                  {/* <Tr>
                    <Td>Day Salary</Td>
                    <Td>
                      <input
                        type="number"
                        name="daySalary"
                        id="daySalary"
                        {...formik.getFieldProps("daySalary")}
                        onChange={formik.handleChange}
                        value={formik.values.daySalary}
                        placeholder="Day Salary"
                      />
                      {formik.touched.daySalary && formik.errors.daySalary && (
                        <div style={{ color: "red" }}>
                          {formik.errors.daySalary}
                        </div>
                      )}
                    </Td>
                  </Tr> */}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Flex gap={"10px"}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">
                  {isLoading ? <Spinner /> : "Submit"}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default CreateEmployee;

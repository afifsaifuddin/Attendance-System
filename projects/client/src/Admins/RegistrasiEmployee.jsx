import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getRole, registEmployee } from "../redux/AuthReducer";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";

const employeeSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address format"),
  roleId: Yup.string().required("Role is required"),
  baseSalary: Yup.string().matches(
    /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
    "not valid"
  ),
});
export default function RegistrasiEmployee() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { role } = useSelector((state) => state.AuthReducer);
  // console.log("apakah masuk?", role);

  const formik = useFormik({
    initialValues: {
      email: "",
      roleId: "",
      baseSalary: "",
    },
    validationSchema: employeeSchema,
    onSubmit: (values) => {
      console.log("apakah masuk?");
      dispatch(registEmployee(values, setLoading));
    },
  });

  useEffect(() => {
    dispatch(getRole());
  }, []);
  return (
    <>
      <Button onClick={onOpen} mt={"10px"} mr={"10px"}>
        Add Employee
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"montserrat"}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>Add New Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody pt={"20px"}>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <Text fontSize={"16px"} ml={"30px"}>
                  Email Address
                </Text>
                <InputGroup ml={"30px"} mt={"12px"}>
                  <InputLeftElement>
                    <BsPersonCircle />
                  </InputLeftElement>
                  <Input
                    placeholder="Type here"
                    isRequired={true}
                    id="email"
                    name="email"
                    w={"350px"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </InputGroup>
              </FormControl>
              <Select
                mt={"12px"}
                ml={"30px"}
                w={"350px"}
                placeholder="Pilih Role"
                {...formik.getFieldProps("roleID")}
              >
                {role.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.role}
                  </option>
                ))}
              </Select>
              <FormControl
                isInvalid={
                  formik.touched.baseSalary && formik.errors.baseSalary
                }
              >
                <Text ml={"30px"} mt={"16px"}>
                  Salary
                </Text>
                <InputGroup mt={"12px"} ml={"30px"} w={"350px"}>
                  <InputLeftElement>
                    <CiMoneyCheck1 />
                  </InputLeftElement>
                  <Input
                    placeholder="Amount"
                    id="baseSalary"
                    name="baseSalary"
                    value={formik.values.baseSalary}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.touched.baseSalary && formik.errors.baseSalary && (
                    <FormErrorMessage>
                      {formik.errors.baseSalary}
                    </FormErrorMessage>
                  )}
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

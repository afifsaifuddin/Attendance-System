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
  InputRightElement,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { formEmployee } from "../redux/AuthReducer";

const formEmployeSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  username: Yup.string().required("Please complete this form").min(3),
  fullName: Yup.string().required("Please complete this form").min(3),
  birthday: Yup.date().required("Date is required"),
});

export default function EmployeeForm() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const showPassword = () => {
    setShow(!show);
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
      fullName: "",
      birthday: "",
    },
    validationSchema: formEmployeSchema,
    onSubmit: (values) => {
      console.log("submit", values);
      dispatch(formEmployee(values, setLoading, toast));
    },
  });
  return (
    <Box w={"100vw"} h={"100vh"} bgColor={"white"} mt={"100px"}>
      <Stack textAlign={"center"}>
        <Text fontSize={"40px"}>Employee Form</Text>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt={"20px"} mx={"400px"}>
          <Flex gap={"50px"}>
            <Text fontSize={"20px"}>Password</Text>
            <FormControl
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <InputGroup>
                <Input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  focusBorderColor="#33BBC5"
                ></Input>
                <InputRightElement>
                  <Button
                    size={"sm"}
                    onClick={showPassword}
                    variant={"unstyled"}
                  >
                    {show ? (
                      <AiOutlineEye size={"30px"} />
                    ) : (
                      <AiOutlineEyeInvisible size={"30px"} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Center>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </Center>
            </FormControl>
          </Flex>
        </Stack>
        <Box mt={"20px"} mx={"400px"}>
          <Flex gap={"80px"}>
            <Box>
              <Text fontSize={"20px"}>Name</Text>
            </Box>
            <FormControl
              isInvalid={formik.touched.fullName && formik.errors.fullName}
            >
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                placeholder="Fullname"
                focusBorderColor="#33BBC5"
              ></Input>
              <Center>
                {formik.touched.fullName && formik.errors.fullName && (
                  <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
                )}
              </Center>
            </FormControl>
          </Flex>
        </Box>
        <Box mt={"20px"} mx={"400px"}>
          <Flex gap={"45px"}>
            <Box>
              <Text fontSize={"20px"}>Username</Text>
            </Box>
            <FormControl
              isInvalid={formik.touched.username && formik.errors.username}
            >
              <Input
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
                focusBorderColor="#33BBC5"
              ></Input>
              <Center>
                {formik.touched.username && formik.errors.username && (
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                )}
              </Center>
            </FormControl>
          </Flex>
        </Box>
        <Box mt={"20px"} mx={"400px"}>
          <Flex gap={"60px"}>
            <Box>
              <Text fontSize={"20px"}>Birthday</Text>
            </Box>

            <FormControl
              isInvalid={formik.touched.birthday && formik.errors.birthday}
            >
              <Input
                id="birthday"
                name="birthday"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                placeholder="Select Date and Time"
                type="date"
                focusBorderColor="#33BBC5"
              ></Input>
              <Center>
                {formik.touched.birthday && formik.errors.birthday && (
                  <FormErrorMessage>{formik.errors.birthday}</FormErrorMessage>
                )}
              </Center>
            </FormControl>
          </Flex>
          <Button
            mt={"30px"}
            bgColor={"#33BBC5"}
            type="submit"
            position={"center"}
            w={"100%"}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuth } from "../redux/AuthReducer";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address format"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

export default function Login() {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispath = useDispatch();

  const showPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispath(loginAuth(values, setLoading, toast, navigate));
    },
  });

  return (
    <Flex
      width={"100wh"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"gray.400"}
      gap={"20px"}
    >
      <Box w={"50%"}>
        <Image src="https://drive.google.com/uc?export=view&id=1iBYdtN-WuIpng--Cpl7cZ3tiNlC_vlHY"></Image>
      </Box>
      <Stack
        boxShadow={"xl"}
        borderRadius={"20px"}
        h={"300px"}
        px={"20px"}
        textAlign={"center"}
        bgColor={"white"}
        color={"white"}
      >
        <Text fontSize={"32px"} fontWeight={"bold"} mt={"30px"} color={"Black"}>
          Sign in
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <InputGroup mt={"20px"}>
                <InputLeftElement>
                  <BsPersonCircle color="black" />
                </InputLeftElement>
                <Input
                  focusBorderColor="#33BBC5"
                  color={"black"}
                  placeholder="Email"
                  isRequired={true}
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                ></Input>
              </InputGroup>
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <InputGroup mt={"20px"}>
                <InputLeftElement>
                  <BiSolidLockAlt color="black" />
                </InputLeftElement>
                <Input
                  placeholder="Password"
                  focusBorderColor="#33BBC5"
                  id="password"
                  color={"black"}
                  name="password"
                  type={show ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                ></Input>
                <InputRightElement>
                  <Button
                    color={"black"}
                    size={"md"}
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
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" bgColor="#33BBC5" mt={"30px"} w={"300px"}>
              {isLoading ? <Spinner /> : "LOGIN"}
            </Button>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

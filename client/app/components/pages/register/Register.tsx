import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import HeadTag from "../HeadTag";

const Register = () => {
  const { replace } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <HeadTag title={"Регистрация"} />

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Создать новый аккаунт
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>Имя</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Фамилия</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.600"}
                color={"white"}
                _hover={{
                  bg: "blue.700",
                }}
              >
                Отправить
              </Button>
              <Flex direction={"row"} alignItems={"center"}>
                <Divider />
                <Text px={2}>Или</Text>
                <Divider />
              </Flex>

              <Button
                variant={"outline"}
                onClick={() => replace("/auth/login")}
              >
                <Text color={"blue.600"}>Войти в существующий</Text>
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;

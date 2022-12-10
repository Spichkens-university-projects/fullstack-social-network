import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../hooks/useActions";

import { IAuthLoginFields } from "../../../store/auth/auth.types";
import HeadTag from "../HeadTag";

const Login = () => {
  const { signIn } = useActions();
  const { replace } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IAuthLoginFields>();

  const onSubmit: SubmitHandler<IAuthLoginFields> = async (data, event) => {
    event?.preventDefault();
    signIn(data);
    replace("/");
  };

  return (
    <>
      <HeadTag title={"Аутентификация"} />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Войдите в аккаунт</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder={"Email"}
                    {...register("email", {
                      required: "Это поле не может быть пустым",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder={"Пароль"}
                    {...register("password", {
                      required: "Это поле не может быть пустым",
                      minLength: {
                        value: 4,
                        message: "Минимальная длина пароля - 4 символа",
                      },
                      maxLength: {
                        value: 17,
                        message: "Максимальная длина пароля - 16 символов",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  isLoading={isSubmitting}
                  type={"submit"}
                  bg={"blue.600"}
                  color={"white"}
                  _hover={{
                    bg: "blue.700",
                  }}
                >
                  Войти
                </Button>
                <Flex direction={"row"} alignItems={"center"}>
                  <Divider />
                  <Text px={2}>Или</Text>
                  <Divider />
                </Flex>
                <Button
                  variant={"outline"}
                  onClick={() => replace("/auth/register")}
                >
                  <Text color={"blue.600"}>Создать новый</Text>
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;

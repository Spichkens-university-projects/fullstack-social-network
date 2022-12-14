import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useActions } from "../../../hooks/useActions";
import { IAuthRegisterFields } from "../../../store/auth/auth.types";
import ValidationInput from "../../ui/auth/ValidationInput";
import HeadTag from "../HeadTag";

const Register = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { signUp } = useActions();
  const { replace } = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IAuthRegisterFields>();

  const onSubmit: SubmitHandler<IAuthRegisterFields> = async (data, event) => {
    event?.preventDefault();
    signUp(data);
    await replace("/auth/login");
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <ValidationInput
                  placeholder={"Имя"}
                  type="text"
                  label="Имя"
                  register={register}
                  errors={errors.name}
                  fieldName="name"
                />
                <ValidationInput
                  placeholder={"Фамилия"}
                  type="text"
                  label={"Фамилия"}
                  register={register}
                  errors={errors.surname}
                  fieldName="surname"
                />
                <ValidationInput
                  placeholder={"Email"}
                  type="email"
                  label="Email"
                  register={register}
                  errors={errors.email}
                  fieldName="email"
                />
                <ValidationInput
                  placeholder={"Пароль"}
                  grouped={true}
                  label="Пароль"
                  type={isPasswordShown ? "text" : "password"}
                  register={register}
                  errors={errors.password}
                  fieldName="password"
                >
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setIsPasswordShown((showPassword) => !showPassword)
                      }
                    >
                      {isPasswordShown ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </ValidationInput>

                <Button
                  isLoading={isSubmitting}
                  type={"submit"}
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
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;

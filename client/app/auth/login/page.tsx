'use client'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from "next/link";
import HeadParams from "../../../components/HeadParams";
import ThemeSwitcher from "../../../components/ui/ThemeSwitcher";

const LoginPage = () => {
    return (
        <>
            <HeadParams title={'Аутентификация'}/>
            <Box pos={'absolute'} top={0} left={0}>
                <ThemeSwitcher/>
            </Box>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Войдите в аккаунт</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email"/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <Input type="password"/>
                            </FormControl>

                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Войти
                            </Button>

                            <Stack pt={5}>
                                <Text align={"center"}>
                                    Еще нет аккаунта?{' '}
                                    <Link href={'/auth/register'} className={'text-blue-400'}>
                                        Зарегистрироваться
                                    </Link>
                                </Text>
                            </Stack>

                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}

export default LoginPage
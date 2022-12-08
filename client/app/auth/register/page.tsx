'use client'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {
    Box,
    Button,
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
} from '@chakra-ui/react';
import Link from "next/link";
import {useState} from 'react';
import HeadParams from "../../../components/HeadParams";
import ThemeSwitcher from "../../../components/ui/ThemeSwitcher";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <>
            <HeadParams title={'Регистрация'}/>
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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Создание нового аккаунта
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>Имя</FormLabel>
                                        <Input type="text"/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Фамилия</FormLabel>
                                        <Input type="text"/>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email"/>
                            </FormControl>
                            <FormControl id={showPassword ? "text" : "password"} isRequired>
                                <FormLabel>Пароль</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={togglePasswordVisibility}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Зарегистрироваться
                                </Button>
                            </Stack>
                            <Stack pt={5}>
                                <Text align={"center"}>
                                    Уже есть аккаунт?{' '}
                                    <Link href={'/auth/login'} className={'text-blue-400'}>
                                        Войти
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

export default RegisterPage
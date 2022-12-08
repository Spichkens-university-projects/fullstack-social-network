'use client'
import {
    Avatar,
    Box,
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {FiBell, FiChevronDown, FiMenu} from "react-icons/fi";
import ThemeSwitcher from "../ui/ThemeSwitcher";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen,  }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton

                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <ThemeSwitcher/>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://sun9-7.userapi.com/impg/ui8WILjD7Wkl-y2aAaIIiIDvI25EReVNbk3YUA/eA3nk8T1YcI.jpg?size=758x1385&quality=95&sign=f5954e3e85942c2d6c0e971b6f198d19&type=album'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Sasha Spichka</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        @Spichkens
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem bg={useColorModeValue('gray.200', 'gray.900')}>
                                <Link href={'/settings'}>
                                    Настройки
                                </Link>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem bg={useColorModeValue('gray.200', 'gray.900')}>
                                <Text color="red.500">
                                    Выйти
                                </Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav
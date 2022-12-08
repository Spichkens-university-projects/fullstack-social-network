'use client'
import {Button, useColorMode} from '@chakra-ui/react';
import {BsMoonStarsFill, BsSun} from 'react-icons/bs';

const ThemeSwitcher = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <BsSun/> : <BsMoonStarsFill/>}
        </Button>
    );
}

export default ThemeSwitcher
'use client'
import Link from "next/link";
import React, {FC, PropsWithChildren} from 'react'
import {BiSearchAlt} from "react-icons/bi";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import ThemeToggler from "../ui/theme-toggler/ThemeToggler";


import styles from "./Header.module.scss"

interface Props {

}


const Header: FC<PropsWithChildren<Props>> = ({children}) => {
    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                {/*Left side*/}
                <Link href={'/'} className={styles.logo}>
                    ISocial
                </Link>

                {/*Right side*/}
                <div className={styles.rightside}>
                    <ThemeToggler/>
                    <Input placeholder={'Поиск'} icon={BiSearchAlt}/>
                    <Button type={'transparent'}>Войти</Button>
                </div>
            </div>
        </div>
    )
}

export default Header
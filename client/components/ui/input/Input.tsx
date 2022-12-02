import React, {FC, HTMLAttributes, PropsWithChildren, useState} from 'react'
import {IconType} from "react-icons";
import {useTheme} from "../../../hooks/useTheme";

import styles from "./Input.module.scss"

interface IconTypeProps {
    width: number;
    height: number;
    color: string;
}

interface Props {
    icon: IconType
}

const Input: FC<PropsWithChildren<Props & HTMLAttributes<HTMLInputElement>>> = (props, ...rest) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const {theme} = useTheme()

    return (
        <div className={[styles.wrapper, isFocused ? styles.active : styles.inactive].join(' ')}>
            <span className={styles.icon}>
                <props.icon color={isFocused ? `#1778F2` : theme === 'light' ? `#000000` : '#FFF'} size={16}/>
            </span>
            <input type="text"
                   placeholder={props.placeholder}
                   className={styles.input}
                   onFocusCapture={() => setIsFocused(true)}
                   onBlurCapture={() => setIsFocused(false)}
            />
        </div>
    )
}

export default Input
import {FC, PropsWithChildren} from 'react'

import styles from "./Button.module.scss"

type ButtonType = 'fill' | 'transparent'

interface Props {
    type: ButtonType
}

const Button: FC<PropsWithChildren<Props>> = ({children, type}) => {
    return (
        <button className={[styles.wrapper, styles[type]].join(' ')}>
            {children}
        </button>
    )
}

export default Button
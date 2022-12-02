'use client'
import {getCookie, setCookie} from "cookies-next";
import {useEffect, useState} from "react";

const getPrefersColor = () => window.matchMedia("(prefers-color-scheme: light)").matches ? 'light' : 'dark';


export const useTheme = () => {
    const [theme, setTheme] = useState<string | undefined>(() => {
            if (!getCookie('theme')) return getPrefersColor()
            return getCookie('theme')?.toString()
        }
    )

    const toggleThemeHandler = (currentTheme: string) => {
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme as string)
        setCookie('theme', theme, {maxAge: 10000000})
    }, [theme])

    return {theme, toggleThemeHandler}
}
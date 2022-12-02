import {motion} from 'framer-motion'
import {FaRegMoon, FaSun} from "react-icons/fa";
import {useTheme} from "../../../hooks/useTheme";


const ThemeToggler = () => {
    const {theme, toggleThemeHandler} = useTheme()

    return (
        <motion.div onClick={() => toggleThemeHandler(theme as string)}>
            {theme === 'light'
                ? <FaRegMoon color={`#000`}/>
                : <FaSun color={`#FFF`}/>
            }
        </motion.div>
    )
}

export default ThemeToggler
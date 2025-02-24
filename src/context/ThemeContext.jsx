import { createContext, useState } from "react";

// Correct context name
export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    const toggle = () => {
        setDark(!dark);
        if(!dark){
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
        }else{
            document.body.style.backgroundColor = 'White';
        }

    };
    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
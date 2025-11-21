import { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme } from "./themes";
import React from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode
  theme: typeof lightTheme;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | any>(null);

export function ThemeProvider({ children } : { children : React.ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>("light")

    const theme = mode === "light" ? lightTheme : darkTheme; 

    const setTheme = (newMode: ThemeMode) => { 
        setModeState(newMode);
    }
    return (
        <ThemeContext.Provider value={{ mode, theme, setTheme }}> 
        {children} 
        </ThemeContext.Provider>
    );
}

export function useTheme() {
  return useContext(ThemeContext);
}


import { createTheme } from "@mui/material";

export const darkThemeData = {
    palette: {
      type: 'dark',
      primary: {
        main: '#1E1E1E',
        light: "#FFFFFF"
      }
    },
    typography: {
      fontFamily: 'graphik',
    }
  };

export const darkTheme= createTheme(darkThemeData);
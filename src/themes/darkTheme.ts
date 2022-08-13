import { createTheme } from "@mui/material";

export const darkThemeData = {
    palette: {
      type: 'dark',
      primary: {
        main: '#1E1E1E',
        light: "#FFFFFF",
        dark: '#1E1E1E'
      },
      text: {
        primary: '#6E6E84'
      },
    },
    typography: {
      fontFamily: 'graphik',
      htmlFontSize: 18,
    }
  };

export const darkTheme= createTheme(darkThemeData);
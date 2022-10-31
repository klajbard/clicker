const defaultTheme = {
  colors: {
    black: {
      normal: "#000",
      faded: "#0000000f",
    },
    white: {
      normal: "#fff",
      light_fade: "#ffffff80",
      lighter_fade: "#ffffffa0",
    },
    grey: {
      light: "#efefef",
      normal: "#afafaf",
      dark: "#4f4f4f",
    },
    price: "#8b0000",
    description: "#00008b",
    secondary: {
      normal: "#525e75",
      light: "#76849f",
      lighter: "#8f9ab0",
      lightest: "#bed6be",
    },
    main: {
      normal: "#f1ddbf",
    },
  },
};

export type ThemeInterface = typeof defaultTheme;

export default defaultTheme;

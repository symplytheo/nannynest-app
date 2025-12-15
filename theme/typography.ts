import { TextStyle } from "react-native";

// Font family mappings based on weights
export const fontFamilies = {
  300: "Sato-Light",
  400: "Sato",
  500: "Sato-Medium",
  600: "Sato-SemiBold",
  700: "Sato-Bold",
  900: "Sato-Heavy",
};

// Helper function to create font styles
const createFontStyle = (
  fontSize: number,
  lineHeight: number,
  fontWeight: keyof typeof fontFamilies = 400
): TextStyle => ({
  fontSize,
  lineHeight,
  fontFamily: fontFamilies[fontWeight],
  fontWeight: fontWeight.toString() as TextStyle["fontWeight"],
});

// Typography styles object
const typography = {
  // headings styles
  headingLarger: createFontStyle(48, 60, 700),
  headingLarge: createFontStyle(36, 46, 700),
  headingMedium: createFontStyle(30, 40, 600),
  headingSmall: createFontStyle(24, 34, 500),

  // body styles
  bodyLarge: createFontStyle(20, 32, 400),
  bodyMedium: createFontStyle(18, 30, 400),
  bodySmall: createFontStyle(14, 24, 400),
  caption: createFontStyle(14, 22, 400),
};

// Font weights enum
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  heavy: 900,
} as const;

export default typography;

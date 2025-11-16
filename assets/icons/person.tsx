import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "~/theme";
import { IconProps } from "./_types";

const PersonIcon = ({ size = 24, color = colors.brand300, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      d="M10.3 10a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333Z"
      opacity={0.4}
    />
    <Path
      fill={color}
      d="M10.294 12.083c-4.175 0-7.575 2.8-7.575 6.25 0 .234.183.417.416.417h14.317a.413.413 0 0 0 .417-.417c0-3.45-3.4-6.25-7.575-6.25Z"
    />
  </Svg>
);
export default PersonIcon;

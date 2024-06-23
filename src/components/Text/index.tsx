import { Text as RNText, TextStyle } from "react-native";
import COLORS from "@/src/constants/Colors";

const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 28,
};

const weights = {
  regular: "400",
  medium: "500",
  bold: "700",
  extrabold: "800",
} as const;

type TextProps = {
  children: string | React.ReactNode;
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  color?: keyof typeof COLORS.text;
  style?: TextStyle;
  underline?: boolean;
  center?: boolean;
};

const Text = ({
  children,
  size,
  weight,
  underline,
  color,
  style,
  center
}: TextProps) => {
  return (
    <RNText
      style={{
        fontSize: sizes[size || "md"],
        fontWeight: weights[weight || "regular"],
        color: COLORS.text[color || "PRIMARY"],
        textDecorationLine: underline ? "underline" : "none",
        textAlign: center ? "center" : "left",
        ...style,
      }}
    >
      {children}
    </RNText>
  );
};

export default Text;

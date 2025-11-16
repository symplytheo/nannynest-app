import { Text, TextProps } from "react-native";
import { typography } from "~/theme";

const AppText = (props: TextProps) => {
  return <Text {...props} style={[typography.bodyMedium, props.style]} />;
};

export default AppText;

import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  TextProps,
  useColorScheme,
} from "react-native";

const ThemedText = ({ style, children, ...rest }: TextProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"].text;

  return (
    <Text style={[style, { color }]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({});

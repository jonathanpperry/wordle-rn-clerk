import { StyleSheet, Text, View } from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon width={70} height={70} />
        {/* <Text style={styles.title}>Worldle</Text>
        <Text style={styles.text}>Get 6 chances to guess a 5-letter word.</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 40,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
  },
  footer: {},
});

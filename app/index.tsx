import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { format } from "date-fns";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon width={70} height={70} />
        <Text style={styles.title}>Worldle</Text>
        <Text style={styles.text}>Get 6 chances to guess a 5-letter word.</Text>
      </View>

      <View style={styles.menu}>
        <Link
          href="/game"
          style={[styles.btn, { backgroundColor: "#000" }]}
          asChild
        >
          <TouchableOpacity>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerDate}>
          {format(new Date(), "MMMM d, yyyy")}
        </Text>
        <Text style={styles.footerText}>No. 1151</Text>
        <Text style={styles.footerText}>Edited by Jonny Ramen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 40,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  menu: { alignItems: "center", justifyContent: "center", gap: 10 },
  primaryText: {
    color: "#fff",
  },
  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import { Link } from "expo-router";
import SubscribeModal from "@/components/SubscribeModal";
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from "react";
// import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  //   const subscribeModalRef = useRef<BottomSheetModal>(null);
  const { width } = useWindowDimensions();
  //   const { signOut } = useAuth();

  //   const handlePresentSubscribeModalPress = () => subscribeModalRef.current?.present();

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>
          Get 6 chances to guess a 5-letter word.
        </ThemedText>
      </Animated.View>

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
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerDate}>
          {format(new Date(), "MMMM d, yyyy")}
        </ThemedText>
        <ThemedText style={styles.footerText}>No. 1151</ThemedText>
        <ThemedText style={styles.footerText}>Edited by JonnyRamen</ThemedText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 50,
  },
  header: {
    alignItems: "center",
    gap: 10,
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
  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
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
  primaryItem: {
    backgroundColor: "#000",
  },
  primaryText: {
    color: "#fff",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
  },
});

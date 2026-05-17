import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import { Colors } from "@/constants/Colors";
import { allWords } from "@/utils/allWords";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";

const ROWS = 6;

const Page = () => {
  const colorScheme = useColorScheme();
  const scheme = (colorScheme ?? "light") as "light" | "dark";

  const backgroundColor = Colors[scheme].gameBg;
  const textColor = Colors[scheme].text;
  const grayColor = Colors[scheme].gray;

  const router = useRouter();

  const [rows, setRows] = useState<string[][]>(
    new Array(ROWS).fill(new Array(5).fill("")),
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, _setCurCol] = useState(0);

  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const [word, setWord] = useState("perry");
  const wordLetters = word.split("");

  const colStateRef = useRef(curCol);
  const setCurCol = (col: number) => {
    colStateRef.current = col;
    _setCurCol(col);
  };

  const addKey = (key: string) => {
    const newRows = [...rows.map((row) => [...row])];

    if (key === "ENTER") {
      checkWord();
    } else if (key === "BACKSPACE") {
      if (colStateRef.current === 0) {
        newRows[curRow][0] = "";
        setRows(newRows);
        return;
      }
      setCurCol(colStateRef.current - 1);
      newRows[curRow][colStateRef.current] = "";
      setRows(newRows);
      return;
    } else if (colStateRef.current >= newRows[curRow].length) {
      // End of row, do nothing
      return;
    } else {
      newRows[curRow][colStateRef.current] = key;
      setRows(newRows);
      setCurCol(colStateRef.current + 1);
    }
  };

  const checkWord = () => {
    const currentWord = rows[curRow].join("");

    if (currentWord.length < word.length) {
      console.log("Not enough letters");
      // TODO: show error (shake animation)
      return;
    }

    if (!allWords.includes(currentWord)) {
      console.log("Not a valid word");
      // TODO: show error
      // return
    }

    const newGreenLetters = [...greenLetters];
    const newYellowLetters = [...yellowLetters];
    const newGrayLetters = [...grayLetters];

    currentWord.split("").forEach((letter, index) => {
      if (letter === wordLetters[index]) {
        newGreenLetters.push(letter);
      } else if (wordLetters.includes(letter)) {
        newYellowLetters.push(letter);
      } else {
        newGrayLetters.push(letter);
      }
    });

    setGreenLetters(newGreenLetters);
    setYellowLetters(newYellowLetters);
    setGrayLetters(newGrayLetters);

    setTimeout(() => {
      if (currentWord === word) {
        console.log("You win!");
        // TODO: show win screen
      } else if (curRow + 1 >= rows.length) {
        console.log("You lose! The word was", word);
        // TODO: show lose screen
      }
    }, 0);

    setCurRow(curRow + 1);
    setCurCol(0);
  };

  const getCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (curRow > rowIndex) {
      if (wordLetters[cellIndex] === cell) {
        return Colors.light.green;
      } else if (wordLetters.includes(cell)) {
        return Colors.light.yellow;
      } else return grayColor;
    }
    return "transparent";
  };

  const getBorderColor = (
    cell: string,
    rowIndex: number,
    cellIndex: number,
  ) => {
    if (curRow > rowIndex && cell !== "") {
      return getCellColor(cell, rowIndex, cellIndex);
    }
    return Colors.light.gray;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerIcon}>
              <Ionicons
                name="help-circle-outline"
                size={28}
                color={textColor}
              />
              <Ionicons name="podium-outline" size={28} color={textColor} />
              <Ionicons name="settings-sharp" size={28} color={textColor} />
            </View>
          ),
        }}
      />

      <View style={styles.gameField}>
        {rows.map((row, rowIndex) => (
          <View style={styles.gameFieldRow} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <View
                style={[
                  styles.cell,
                  {
                    backgroundColor: getCellColor(cell, rowIndex, cellIndex),
                    borderColor: getBorderColor(cell, rowIndex, cellIndex),
                  },
                ]}
                key={`cell-${rowIndex}-${cellIndex}`}
              >
                <Text
                  style={[
                    styles.cellText,
                    {
                      color: curRow > rowIndex ? "#fff" : textColor,
                    },
                  ]}
                >
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <OnScreenKeyboard
        onKeyPressed={addKey}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        grayLetters={grayLetters}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  headerIcon: {
    flexDirection: "row",
    gap: 10,
  },
  gameField: {
    alignItems: "center",
    gap: 8,
  },
  gameFieldRow: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    width: 62,
    height: 62,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

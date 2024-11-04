import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { allWords } from "@/utils/allWords";
import { words } from "@/utils/targetWords";

const ROWS = 6;

const Page = () => {
  // const [word, setWord] = useState(
  //   words[Math.floor(Math.random() * words.length)]
  // );
  const [word, setWord] = useState("jonny");

  const wordLetters = word.split("");

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].gameBg;
  const textColor = Colors[colorScheme ?? "light"].text;
  const grayColor = Colors[colorScheme ?? "light"].gray;

  const router = useRouter();

  const [rows, setRows] = useState<string[][]>(
    new Array(ROWS).fill(new Array(5).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, _setCurCol] = useState(0);

  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const colStateRef = useRef(curCol);

  const setCurCol = (data: number) => {
    colStateRef.current = data;
    _setCurCol(data);
  };

  const addKey = (key: string) => {
    console.log("CURRENT: ", colStateRef.current);

    const newRows = [...rows.map((row) => [...row])];

    if (key === "ENTER") {
      checkWord();
    } else if (key === "BACKSPACE") {
      if (colStateRef.current === 0) {
        newRows[curRow][0] = "";
        setRows(newRows);
        return;
      }

      newRows[curRow][colStateRef.current - 1] = "";

      setCurCol(colStateRef.current - 1);
      setRows(newRows);
      return;
    } else if (colStateRef.current >= newRows[curRow].length) {
      // EoL don't add keys
    } else {
      console.log("🚀 ~ addKey ~ curCol", colStateRef.current);

      newRows[curRow][colStateRef.current] = key;
      setRows(newRows);
      setCurCol(colStateRef.current + 1);
    }
  };

  const checkWord = () => {
    const currentWord = rows[curRow].join("");

    if (currentWord.length < word.length) {
      console.log("not enough letters");
      // TODO: show error
      return;
    }

    if (!allWords.includes(currentWord)) {
      console.log("not a word");
      // TODO: show error
    }

    const newGreen: string[] = [];
    const newYellow: string[] = [];
    const newGray: string[] = [];

    currentWord.split("").forEach((letter, index) => {
      if (letter == wordLetters[index]) {
        newGreen.push(letter);
      } else if (wordLetters.includes(letter)) {
        newYellow.push(letter);
      } else {
        newGray.push(letter);
      }
    });

    setGreenLetters([...greenLetters, ...newGreen]);
    setYellowLetters([...yellowLetters, ...newYellow]);
    setGrayLetters([...grayLetters, ...newGray]);

    setTimeout(() => {
      if (currentWord === word) {
        console.log("🚀 ~ checkWord ~ WIN");
        router.push(
          `/end?win=true&word=${word}&gameField=${JSON.stringify(rows)}`
        );
      } else if (curRow + 1 >= rows.length) {
        console.log("GAME OVER");
        router.push(
          `/end?win=false&word=${word}&gameField=${JSON.stringify(rows)}`
        );
      }
    }, 1500);

    setCurRow(curRow + 1);
    setCurCol(0);
  };

  const getCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (curRow > rowIndex) {
      if (wordLetters[cellIndex] === cell) return Colors.light.green;
      else if (wordLetters.includes(cell)) return Colors.light.yellow;
      else return grayColor;
    }

    return "transparent";
  };

  const getBorderColor = (
    cell: string,
    rowIndex: number,
    cellIndex: number
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
            <View style={styles.headerIcons}>
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

      {/* Game field! */}
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
  gameField: {
    alignItems: "center",
    gap: 8,
  },
  gameFieldRow: {
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    backgroundColor: "#fff",
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  cellText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
});

import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

function StatisticScreen() {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "w-full h-full flex flex-col justify-center items-center"
      )}
    >
    </View>
  );
}

export default StatisticScreen;

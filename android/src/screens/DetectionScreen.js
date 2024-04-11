import {
  View
} from "react-native";
import { useTailwind } from "tailwind-rn";

function DetectionScreen() {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "flex flex-col mx-auto w-full h-full px-2 items-center pt-10 bg-white"
      )}
    >
    </View>
  );
}

export default DetectionScreen;

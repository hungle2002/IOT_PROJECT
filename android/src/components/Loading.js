import { ActivityIndicator, View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

function Loading({ children }) {
  const tailwind = useTailwind();

  return (
    <View style={tailwind(" w-[100%] h-[100%] absolute")}>
      <View
        style={tailwind(" w-[100%] h-[100%] absolute bg-black opacity-40")}
      ></View>
      <View style={tailwind("mx-auto my-auto w-48 h-32 items-center")}>
        {children}
      </View>
    </View>
  );
}

export default Loading;

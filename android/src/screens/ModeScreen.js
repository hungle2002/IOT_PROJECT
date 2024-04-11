import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import React from "react";


function ModeScreen({ navigation }) {
  const tailwind = useTailwind();
  return (
    // <ModeSettingContext.Provider value={{ modeSetting, setModeSetting }}>
    <View style={tailwind(" w-[100%] h-[100%]")}>
    </View>
    // </ModeSettingContext.Provider>
  );
}

export default ModeScreen;

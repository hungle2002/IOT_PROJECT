import Slider from "@react-native-community/slider";
import { useTailwind } from "tailwind-rn";
import { View, Text, TextInput } from "react-native";
import ModeSettingContext from "../context/modeSettingContext";
import * as React from "react";

function RangeButton({ unit, mode, isSafe }) {
  const tailwind = useTailwind();
  const { modeSetting, setModeSetting } = React.useContext(ModeSettingContext);
  let minType = "autoMin";
  let maxType = "autoMax";
  if (isSafe == 1) {
    minType = "safeMin";
    maxType = "safeMax";
  } else if (modeSetting[mode]["mode"] == 2) {
    minType = "manualMin";
    maxType = "manualMax";
  }

  const [topRangeValue, setTopRangeValue] = React.useState(
    modeSetting[mode][maxType]
  );
  const [botRangeValue, setBotRangeValue] = React.useState(
    modeSetting[mode][minType]
  );

  const handleSaveSetting = () => {
    const tmp = {
      ...modeSetting,
    };
    tmp[mode][minType] = botRangeValue;
    tmp[mode][maxType] = topRangeValue;
    setModeSetting(tmp);

    console.log("Save mode setting");
  };

  return (
    <View>
      <View style={tailwind("flex flex-row items-center justify-between px-4")}>
        <Text style={tailwind("text-sm")}>Min</Text>
        <Slider
          style={{ width: 160, height: 40 }}
          minimumValue={10}
          maximumValue={50}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          value={botRangeValue ? botRangeValue : 0}
          step={1}
          onValueChange={(value) => setBotRangeValue(value)}
          onSlidingComplete={handleSaveSetting}
        />
        <View style={tailwind("flex flex-row items-center")}>
          <TextInput
            style={tailwind(
              "bg-[#D9D9D9] font-semibold text-center w-10 h-6 rounded-md"
            )}
            label="Email"
            value={botRangeValue ? botRangeValue.toString() : "0"}
            keyboardType="numeric"
            onChangeText={(value) => setBotRangeValue(parseInt(value, 10))}
            onSubmitEditing={handleSaveSetting}
          />
          <Text style={tailwind("ml-1 text-lg font-semibold")}>{unit}</Text>
        </View>
      </View>

      <View style={tailwind("flex flex-row items-center justify-between px-4")}>
        <Text style={tailwind("text-sm")}>Max</Text>
        <Slider
          style={{ width: 160, height: 40 }}
          minimumValue={10}
          maximumValue={50}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          value={topRangeValue ? topRangeValue : 0}
          step={1}
          onValueChange={(value) => setTopRangeValue(value)}
          onSlidingComplete={handleSaveSetting}
        />
        <View style={tailwind("flex flex-row items-center")}>
          <TextInput
            style={tailwind(
              "bg-[#D9D9D9] font-semibold text-center w-10 h-6 rounded-md"
            )}
            label="Email"
            value={topRangeValue ? topRangeValue.toString() : "0"}
            keyboardType="numeric"
            onChangeText={(value) => setTopRangeValue(parseInt(value, 10))}
            onSubmitEditing={handleSaveSetting}
          />
          <Text style={tailwind("ml-1 text-lg font-semibold")}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

export default RangeButton;

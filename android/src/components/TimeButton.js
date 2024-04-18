import React, { useState, useMemo } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTailwind } from "tailwind-rn";
import ModeSettingContext from "../context/modeSettingContext";
import { getTime } from "../utils/dateTime";

const TimeButton = ({ type, mode }) => {
  const tailwind = useTailwind();
  const [showPicker, setShowPicker] = useState(false);
  const { modeSetting, setModeSetting } = React.useContext(ModeSettingContext);
  const typeTime = type ? "schedEnd" : "schedStart";
  const [time, setTime] = useState(() => {
    const date = new Date();
    const usingTime = modeSetting[mode][typeTime];
    date.setHours(Number(usingTime.substring(0, 2)));
    date.setMinutes(Number(usingTime.substring(3, 5)));
    return date;
  });
  const handleTimeConfirm = (selectedTime) => {
    setTime(selectedTime);
    setShowPicker(false);
    const tmp = { ...modeSetting };
    tmp[mode][typeTime] = getTime(selectedTime).replace(/\s/g, "");
    console.log(`Setting ${typeTime} for ${mode} successfully!`);
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={tailwind("flex flex-row items-center")}>
      <Text style={tailwind("text-[15px]")}>{type ? "To:" : "From:"}</Text>
      <View style={tailwind("bg-[#D9D9D9] px-3 py-1 rounded-lg ml-3")}>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={tailwind("font-semibold")}>{getTime(time)}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowPicker(false)}
      />
    </View>
  );
};

export default TimeButton;

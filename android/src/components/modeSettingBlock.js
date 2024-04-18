import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ModeChoices, SafeModeChoices } from "../config/mode";
import RadioButtonComponent from "./RadioButtonComponent";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ModeSettingContext from "../context/modeSettingContext";
import RangeButton from "./RangeButton";
import TimeButton from "./TimeButton";

function ModeSettingBlock({ condition, mode }) {
  const { modeSetting, setModeSetting } = React.useContext(ModeSettingContext);
  console.log('');
  console.log('');
  console.log('Current data: ');
  console.log(modeSetting);
  console.log('');
  console.log('');
  const [show, setShow] = React.useState(0);
  const tailwind = useTailwind();
  return (
    <View style={tailwind("text-xl w-[90%] ")}>
      <View
        style={{
          backgroundColor: condition.color,
          borderRadius: 10,
        }}
      >
        <View style={tailwind("px-2 ")}>
          <View
            style={tailwind("flex flex-row justify-between items-center pr-2")}
          >
            <TouchableOpacity onPress={() => setShow(1)}>
              <Text style={tailwind("text-xl mx-2 mt-2 font-semibold")}>
                {condition.title}
              </Text>
            </TouchableOpacity>
            {show == 0 && (
              <TouchableOpacity
                style={tailwind("w-[18px] h-[16px]")}
                onPress={() => setShow(1)}
              >
                <FontAwesomeIcon icon={faChevronDown} size={20} />
              </TouchableOpacity>
            )}
            {show == 1 && (
              <TouchableOpacity
                style={tailwind("w-[18px] h-[16px]")}
                onPress={() => setShow(0)}
              >
                <FontAwesomeIcon icon={faChevronUp} size={20} />
              </TouchableOpacity>
            )}
          </View>
          {show == 1 && (
            <View>
              <View style={tailwind("bg-white m-2 px-4 py-2")}>
                <Text style={tailwind("font-extrabold text-lg")}>Mode</Text>
                <RadioButtonComponent
                  listChoice={ModeChoices}
                  mode={mode}
                  type="mode"
                />
              </View>

              {modeSetting[mode]["mode"] == 0 && (
                <View style={tailwind("bg-white m-2 px-4 py-2")}>
                  <Text style={tailwind("font-extrabold text-lg")}>
                    Normal range
                  </Text>
                  <View>
                    <RangeButton unit={condition.unit} mode={mode} isSafe={0} />
                  </View>
                </View>
              )}

            </View>
          )}
        </View>
        <View style={tailwind("h-2")}></View>
      </View>
      <View style={tailwind("h-4")}></View>
    </View>
  );
}

export default ModeSettingBlock;

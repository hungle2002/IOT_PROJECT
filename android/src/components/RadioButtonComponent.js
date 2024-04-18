import * as React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import ModeSettingContext from "../context/modeSettingContext";

const RadioButtonComponent = ({ listChoice, mode, type }) => {
  const { modeSetting, setModeSetting } = React.useContext(ModeSettingContext);
  const [value, setValue] = React.useState(modeSetting[mode][type]);

  if (value != modeSetting[mode][type]) {
    setValue(modeSetting[mode][type]);
  }

  const handleChange = (value) => {
    setValue(value);
    const tmp = { ...modeSetting };
    tmp[mode][type] = value;
    setModeSetting(tmp);
    console.log("Save behaviour setting");
  };

  return (
    <View>
      <RadioButton.Group
        onValueChange={(newValue) => handleChange(newValue)}
        value={value}
      >
        {listChoice.map((e, index) => (
          <RadioButton.Item key={index} label={e} value={index} />
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default RadioButtonComponent;

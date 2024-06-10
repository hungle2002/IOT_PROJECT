import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { devicesImage } from "./data";
import { create } from "../../apiServices/searchService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../../context/socketContext";

const DeviceItem = ({ device }) => {
  const tailwind = useTailwind();
  const socket = React.useContext(SocketContext);
  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleButton = async () => {
    try {
      // setLoading(true);
      const update_value = state > 0 ? 0 : 1;
      // await create({
      //   path: `device/${device.key}/state`,
      //   data: { value: update_value },
      // });
      // setLoading(false);
      socket.emit("update_one_device_state", [device.key, update_value]);
      setState(update_value);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    setState(device.state);
  }, []);
  return (
    <View style={tailwind("flex flex-row p-1 items-center justify-between")}>
      <View style={tailwind("flex flex-row p-1 items-center")}>
        <Image
          source={devicesImage[device.key]}
          style={tailwind("w-[40px] h-[40px]")}
        />
        <Text style={tailwind("text-xl px-3")}>{device.des}</Text>
      </View>
    </View>
  );
};

export default DeviceItem;

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
const DeviceItem = ({ device }) => {
  const tailwind = useTailwind();
  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleButton = async () => {
    try {
      setLoading(true);
      const update_value = state > 0 ? 0 : 1;
      await create({
        path: `device/${device.key}/state`,
        data: { value: update_value },
      });
      setLoading(false);
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
      <View>
        {device.typ === "Sensor" ? (
          <TouchableOpacity
            style={tailwind(
              "w-[70px] h-[40px] justify-center items-center rounded-full"
            )}
            onPress={() => {}}
          >
            <Text style={tailwind("text-teal-500 text-lg")}>Good</Text>
          </TouchableOpacity>
        ) : loading ? (
          <ActivityIndicator style={tailwind("mr-5")} size={30} color="gray" />
        ) : state > 0 ? (
          <TouchableOpacity
            style={tailwind(
              "w-[70px] h-[40px] bg-teal-200 justify-center items-center rounded-full"
            )}
            onPress={() => handleButton()}
          >
            <Text style={tailwind("text-teal-500 text-lg")}>On</Text>
          </TouchableOpacity>
        ) : state === 0 ? (
          <TouchableOpacity
            style={tailwind(
              "w-[70px] h-[40px] bg-rose-500 justify-center items-center rounded-full"
            )}
            onPress={() => handleButton()}
          >
            <Text style={tailwind("text-white text-lg")}>Off</Text>
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon
            icon={faSpinner}
            size={30}
            style={tailwind("animate-spin")}
          />
        )}
      </View>
    </View>
  );
};

export default DeviceItem;

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { search } from "../apiServices/searchService";
import Modes from "../config/mode";
import { SocketContext } from "../context/socketContext";
import ProgressBar from "react-native-progress/Bar";
import PopupMenu from "../components/Popupmodel";

const FERTILIZER_RUN = 10 * 1000;

function DashboardScreen({ navigation }) {
  const socket = React.useContext(SocketContext);
  const defaultValue = [32, 43, 118];
  const data = [
    {
      name: "Thùng 1",
      value: 50,
      mode: 0,
      min: 0,
      max: 500,
      remainingTime: "5 phút 7 giây",
      fertilizer: "Kali",
    },
    {
      name: "Thùng 2",
      value: 40,
      mode: 0,
      min: 0,
      max: 450,
      remainingTime: "4 phút 30 giây",
      fertilizer: "Đạm",
    },
    {
      name: "Thùng 3",
      value: 86,
      mode: 0,
      min: 0,
      max: 200,
      remainingTime: "6 phút 20 giây",
      fertilizer: "Lân",
    },
  ];
  const tailwind = useTailwind();
  // save value of condtion
  const [conditionValue, setConditionValue] = React.useState(defaultValue);
  // save all setting for condition
  const [condititonSetting, setConditionSetting] = React.useState(data);
  // save state for refresh button
  const [refreshing, setRefreshing] = React.useState(false);
  // pop up model
  const [isModalVisible, setModalVisible] = React.useState(false);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setConditionSetting((prevConditionSetting) =>
  //       prevConditionSetting.map((item) => {
  //         const newValue = item.value < item.max ? item.value + 1 : item.max;
  //         return { ...item, value: newValue };
  //       })
  //     );
  //   }, 1000); // Update every second

  //   return () => clearInterval(interval);
  // }, []);

  const getStatusDisplay = (value, start, end) => {
    if (value > start && value < end) {
      return {
        text: "Good",
        color: "black",
      };
    } else if (value > end) {
      return {
        text: "High",
        color: "red",
      };
    }
    return {
      text: "Low",
      color: "#031cab",
    };
  };
  // function to update value of condititon
  // const updateValue = (value) => {
  //   const tmp = [value.tempValue, value.lightValue, value.soilValue];
  //   setConditionValue(tmp);
  // };
  // function to update setting condition
  const updateSetting = (res) => {
    // const 
    const { activeFertilizer, fertilizerSchedule} = res;
    const currentSetting = fertilizerSchedule.map((item, id) => {
      let currentValue = 0;
      let remainingTime = FERTILIZER_RUN;

      if (id === activeFertilizer.mixerId) {
        remainingTime = new Date(activeFertilizer.startedAt) + FERTILIZER_RUN - new Date();
        currentValue = remainingTime / FERTILIZER_RUN * item.mixVolume;
      } else if (id < activeFertilizer.mixerId) {
        currentValue = item.mixVolume;
        remainingTime = 0
      }

      return {
        name: `Thùng ${id + 1}`,
        value: currentValue,
        mode : item.type,
        min: 0,
        max: item.mixVolume,
        remainingTime: remainingTime,
        fertilizer: item.name,
      }
    })
    setConditionSetting(currentSetting);
  };
  // function to handle refresh
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // update condition setting
    const fetchAPI = async () => {
      try {
        const response = await search({
          path: "fertilizer/active",
        });
        updateSetting(response.condition);
      } catch (error) {
        console.log("error");
      }
    };
    await fetchAPI();
    setRefreshing(false);
  }, []);

  // get data for the first time render
  React.useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await search({
          path: "fertilizer/active",
        });
        updateSetting(response);
      } catch (error) {
        console.log("error");
      }
    };
    fetchAPI();
  }, []);
  // socket liston on updating condition value
  // React.useEffect(() => {
  //   socket.on(`update_condition`, (value) => {
  //     setConditionValue(value);
  //   });
  // }, [socket]);

  // socket liston on updating one condition value
  // React.useEffect(() => {
  //   socket.on(`update_one_condition`, (value) => {
  //     const vewValue = [...defaultValue];
  //     defaultValue[value[1]] = value[0];
  //     vewValue[value[1]] = value[0];
  //     setConditionValue(vewValue);
  //   });
  // }, [socket]);
  console.log("Current setting value: ", condititonSetting);

  // socket liston on updating setting info
  // React.useEffect(() => {
  //   socket.on(`update_all_settings`, (value) => {
  //     const newConditionSetting = [...condititonSetting];
  //     newConditionSetting[0].max = value["0"].autoMax;
  //     newConditionSetting[0].min = value["0"].autoMin;
  //     setConditionSetting(newConditionSetting);
  //   });
  // }, [socket]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={tailwind("w-full flex-1 flex-col items-center")}>
        {condititonSetting.map((item, index) => (
          <View key={index} style={styles.circularRect}>
            <View style={tailwind("items-center")}>
              <Text>{item.name}</Text>
            </View>
            <ProgressBar
              progress={item.value / (item.max - item.min)}
              height={20}
              style={styles.progressbar}
            />
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Thời gian còn lại:</Text>
              <Text style={styles.infoText}>{item.remainingTime}</Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Số ml dung dịch đã bơm:</Text>
              <Text style={styles.infoText}>
                {item.value} / {item.max} ml
              </Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Tên dung dịch:</Text>
              <Text style={styles.infoText}>{item.fertilizer}</Text>
            </View>
          </View>
        ))}
      </View>
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Tạo mới bộ trộn phân</Text>
          </TouchableOpacity>
        </View>
        <PopupMenu
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onRefresh={onRefresh}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  circularRect: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    width: "90%",
  },
  progressbar: {
    width: "100%",
  },
  infoText: {
    color: "#00796B",
    fontSize: 14,
    marginVertical: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardScreen;

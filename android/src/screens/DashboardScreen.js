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
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { search } from "../apiServices/searchService";
import Modes from "../config/mode";
import { SocketContext } from "../context/socketContext";
import ProgressBar from "react-native-progress/Bar";
import PopupMenu from "../components/Popupmodel";

const FERTILIZER_RUN = 10 * 1000;

function DashboardScreen({ navigation }) {
  const socket = React.useContext(SocketContext);
  const data = [
    {
      name: "Thùng 1",
      value: 50,
      mode: 0,
      min: 0,
      max: 500,
      startedAt: "5 phút 7 giây",
      fertilizer: "Kali",
    },
    {
      name: "Thùng 2",
      value: 40,
      mode: 0,
      min: 0,
      max: 450,
      startedAt: "4 phút 30 giây",
      fertilizer: "Đạm",
    },
    {
      name: "Thùng 3",
      value: 86,
      mode: 0,
      min: 0,
      max: 200,
      startedAt: "6 phút 20 giây",
      fertilizer: "Lân",
    },
  ];
  const tailwind = useTailwind();
  // save value of condtion
  // save all setting for condition
  const [condititonSetting, setConditionSetting] = React.useState(data);
  // save state for refresh button
  const [refreshing, setRefreshing] = React.useState(false);
  // pop up model
  const [isModalVisible, setModalVisible] = React.useState(false);

  const isAllowStart = condititonSetting.every((item) => item.value === 0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setConditionSetting((prevConditionSetting) =>
        prevConditionSetting.map((item) => {
          if (item.remainingTime > 0 && item.isRunning) {
            return { 
              ...item, 
              value : (FERTILIZER_RUN - item.remainingTime + 1000) / FERTILIZER_RUN * item.max,
              remainingTime: item.remainingTime - 1000,
            };
          }
          return item;
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    try {
      socket.emit("update_device", ['iot-btl.mixer1', 1]);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSetting = (res) => {
    // const 
    const { activeFertilizer, fertilizerSchedule} = res;
    const currentSetting = fertilizerSchedule?.map((item, id) => {

      let currentValue = 0;
      let remainingTime = FERTILIZER_RUN;
      let isRunning = false

      if (id === activeFertilizer.mixerId) {
        remainingTime = FERTILIZER_RUN + new Date(activeFertilizer.startedAt).valueOf() - new Date().valueOf() < 0 ? 0 : FERTILIZER_RUN + new Date(activeFertilizer.startedAt).valueOf() - new Date().valueOf();
        currentValue = (FERTILIZER_RUN - remainingTime) / FERTILIZER_RUN * item.mixVolume;
        isRunning = true;
      } else if (id < activeFertilizer.mixerId) {
        currentValue = item.mixVolume;
        remainingTime = 0;
      }

      return {
        name: `Thùng ${id + 1}`,
        value: currentValue,
        mode: item.type,
        min: 0,
        max: item.mixVolume,
        remainingTime : remainingTime,
        fertilizer: item.name,
        isRunning,
      };
    });
    // console.log(currentSetting);
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
        updateSetting(response);
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
      console.log('Calling api');
      try {
        const response = await search({
          path: "fertilizer/active",
        });
        console.log(response);
        updateSetting(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // socket liston on 
  React.useEffect(() => {
    socket.on(`update_fertilizer_mixer`, (value) => {
      // [value, id, startAt]
      // off mixer
      if ( value[0] === 0 ) {
        setConditionSetting((prevConditionSetting) =>
          prevConditionSetting.map((item, index) => {
            if (index === value[1]) {
              return { 
                ...item, 
                remainingTime: 0,
                currentValue : item.mixVolume,
                isRunning : false,
              };
            }
            return item;
          })
        );
      } else {
        setConditionSetting((prevConditionSetting) =>
          prevConditionSetting.map((item, index) => {
            if (index === value[1]) {
              return { 
                ...item, 
                remainingTime: FERTILIZER_RUN,
                currentValue : 0,
                isRunning : true,
              };
            }
            return item;
          })
        );
      }
    });
  }, [socket]);


  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={tailwind('w-full flex-1 flex-col items-center')}>
        {condititonSetting?.map((item, index) => (
          <View key={index} style={styles.circularRect}>
            <View style={tailwind('items-center')}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5, fontSize: 18 }}>{item?.name}</Text>
            </View>
            <View style={{width: '100%', direction:'flex', flexDirection:'row', justifyContent:'center'}}>
              <ProgressBar 
                progress={item?.value / (item.max - item.min)} 
                height={25} 
                width={300}
                style={styles.progressbar} 
                color='#9cf89a' 
                />
            </View>
            <View style={tailwind('flex-1 flex-row justify-between')}>
              <Text style={styles.infoText}>Thời gian còn lại:</Text>
              <Text style={styles.normalText}>{(item?.remainingTime || 0) / 1000}s</Text>
            </View>
            <View style={tailwind('flex-1 flex-row justify-between')}>
              <Text style={styles.infoText}>Dung dịch đã bơm:</Text>
              <Text style={styles.normalText}>
                {item?.value} / {item?.max} ml
              </Text>
            </View>
            <View style={tailwind('flex-1 flex-row justify-between')}>
              <Text style={styles.infoText}>Tên dung dịch:</Text>
              <Text style={styles.normalText}>{item?.fertilizer}</Text>
            </View>
            <View style={tailwind('flex-1 flex-row justify-between')}>
              <Text style={styles.infoText}>Chế độ trộn:</Text>
              <Text style={styles.normalText}>{item?.mode}</Text>
            </View>
          </View>
        ))}
      </View>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleStart} style={isAllowStart ? styles.button : styles.disableButton}>
            <View style={styles.buttonContent}>
              <FontAwesomeIcon icon={faPlay} size={15} color="white" />
              <Text style={styles.buttonText}>Bắt đầu trộn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <View style={styles.buttonContent}>
              <FontAwesomeIcon icon={faPlus} size={15} color="white" />
              <Text style={styles.buttonText}>Tạo mới</Text>
            </View>
          </TouchableOpacity>
        </View>
        <PopupMenu isVisible={isModalVisible} onClose={() => setModalVisible(false)} onRefresh={onRefresh} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  circularRect: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "90%",
  },
  progressbar: {
    // width: "100%",
    marginBottom: 10,
  },
  infoText: {
    // color: "#00796B",
    fontSize: 14,
    marginVertical: 2,
    fontWeight: "500",
  },
  normalText: {
    // color: "#00796B",
    fontSize: 14,
    marginVertical: 2,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "47%",
    marginTop: 10,
    backgroundColor: "#0A7514"
  },
  disableButton : {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "47%",
    marginTop: 10,
    backgroundColor: "#0A7514",
    opacity: 0.7
  },
  buttonText: {
    // color: "black",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  }
});

export default DashboardScreen;

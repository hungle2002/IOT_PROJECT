import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import * as Progress from "react-native-progress";
import { search } from "../apiServices/searchService";
import { SocketContext } from "../context/socketContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PUMP_IN_RUN = 15 * 1000;
const PUMP_OUT_RUN = 15 * 1000;

function WaterScreen() {
  const socket = React.useContext(SocketContext);
  const tailwind = useTailwind();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState("1");

  const [pumpInRemainTime,  setPumpInRemainTime] = useState(PUMP_IN_RUN);
  const [pumpOutRemainTime,  setPumpOutRemainTime] = useState(PUMP_OUT_RUN);

  const [systemStatus, setSystemStatus] = useState(0);
  const [pumpVolume, setPumpVolume] = useState(0);
  const onRefresh = useCallback(async () => {
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

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await search({
          path: "fertilizer/active",
        });
        setSystemStatus(response?.activeFertilizer?.status)
        setPumpVolume(response?.fertilizerSchedule?.reduce((a, b) => a + b?.mixVolume, 0))
        // updateSetting(response);
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
      if (value[1] === 2 && value[0] === 0) {
        setSystemStatus(2);
      }
    });

    socket.on(`update_pump`, (value) => {
      // [value, isPumpIn, startedAt]
      if (value[0] === 0) {
        if (value[1]){
          setSystemStatus(4);
        } else {
          setSystemStatus(6);
        }
      } else {
        if (value[1]){
          setPumpInRemainTime(PUMP_IN_RUN)
        } else {
          setPumpOutRemainTime(PUMP_OUT_RUN)
        }
      }
    });
  }, [socket]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (systemStatus === 3) {
        setPumpInRemainTime((pumpInRemainTime) => pumpInRemainTime - 1000 > 0 ? pumpInRemainTime - 1000 : 0);
      }
      if (systemStatus === 5) {
        setPumpOutRemainTime((pumpOutRemainTime) => pumpOutRemainTime - 1000 > 0 ? pumpOutRemainTime - 1000 : 0);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [systemStatus]);

  const handleUpdateArea = (key) => {
    try {
      socket.emit("update_device", [`iot-btl.area${key}`, 1]);
      setSelectedGarden(key);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePumpIn = () => {
    setSystemStatus(3);
    socket.emit("start_pump_in");
  }

  const handlePumpOut = () => {
    setSystemStatus(5);
    socket.emit("start_pump_out");
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={tailwind("w-full flex-1 flex-col items-center")}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Chọn khu vườn cần tưới</Text>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <TouchableOpacity
                style={[
                  styles.rightSmallBox,
                  selectedGarden === "1" && styles.selectedBox,
                ]}
                onPress={() => handleUpdateArea("1")}
              >
                <Text style={{color: selectedGarden === "1" ? 'white' : '#0A7514', fontWeight: 'bold'}}>Vườn 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rightSmallBox,
                  selectedGarden === "2" && styles.selectedBox,
                ]}
                onPress={() => handleUpdateArea("2")}
              >
                <Text style={{color: selectedGarden === "2" ? 'white' : '#0A7514', fontWeight: 'bold'}}>Vườn 2</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.rightSmallBox,
                selectedGarden === "3" && styles.selectedBox,
              ]}
              onPress={() => handleUpdateArea("3")}
            >
              <Text style={{color: selectedGarden === "3" ? 'white' : '#0A7514', fontWeight: 'bold'}}>Vườn 3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity 
              style={ systemStatus === 2 ? styles.leftSmallBox : styles.disabledLeftSmallBox}
              onPress={handlePumpIn}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {systemStatus === 3 && <FontAwesomeIcon icon={faSpinner} size={15}/>}
                <Text style={{fontSize: 16, color: '#0A7514', fontWeight: 600}}>Bơm nước</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={ systemStatus === 4 ? styles.leftSmallBox : styles.disabledLeftSmallBox}
              onPress={handlePumpOut}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {systemStatus === 5 && <FontAwesomeIcon icon={faSpinner} size={15}/>}
                <Text style={{fontSize: 16, color: '#0A7514', fontWeight: 600}}>Tưới nước</Text>
                </View>
            </TouchableOpacity>
            {/* <View style={styles.leftSmallBox}>
              <Text>Nước hiện có</Text>
              <Text>5000 ml</Text>
            </View> */}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <Progress.Circle
              progress={(PUMP_IN_RUN-pumpInRemainTime)/PUMP_IN_RUN}
              size={100}
              showsText={true}
              color='green'
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 5}}>Tiến độ bơm nước</Text>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Thời gian còn lại:</Text>
              <Text style={styles.infoText}>{pumpInRemainTime/1000}s</Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Số ml dung dịch đã bơm:</Text>
              <Text style={styles.infoText}>{Math.floor((PUMP_IN_RUN-pumpInRemainTime)*pumpVolume/(2*PUMP_IN_RUN))} / {pumpVolume/2}</Text>
            </View>
          </View>
        </View>
        <View style={{height: 20}}/>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <Progress.Circle
              progress={(PUMP_OUT_RUN-pumpOutRemainTime)/PUMP_OUT_RUN}
              size={100}
              showsText={true}
              color='green'
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 5}}>Tiến độ tưới</Text>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Thời gian còn lại:</Text>
              <Text style={styles.infoText}>{pumpOutRemainTime/1000}s</Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Số ml dung dịch đã tưới:</Text>
              <Text style={styles.infoText}>{Math.floor((PUMP_OUT_RUN-pumpOutRemainTime)*pumpVolume*1.5/PUMP_OUT_RUN)} / {pumpVolume * 1.5}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 10,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    backgroundColor: "#f9fef8",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rightSmallBox: {
    borderColor: "#0A7514",
    borderWidth: 2,
    borderRadius: 20,
    padding: 12,
    marginVertical: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  leftSmallBox: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 12,
    marginVertical: 10,
    elevation: 5,
    marginLeft: 10,
    alignItems: "center",
    width: "100%",
    borderColor: "#0A7514",
    borderWidth: 2,
  },
  disabledLeftSmallBox: {
    backgroundColor: "white",
    opacity: 0.3,
    borderRadius: 30,
    padding: 12,
    marginVertical: 10,
    elevation: 5,
    marginLeft: 10,
    alignItems: "center",
    width: "100%",
    borderColor: "#0A7514",
    borderWidth: 2,
  },  
  selectedBox: {
    backgroundColor: "#0A7514",
    opacity:1,
  },
  progressContainer: {
    flex: 3,
  },
  textContainer: {
    flex: 7,
    margin: 5,
    backgroundColor: "#f9fef8",
    borderRadius: 10,
    padding: 10,
    // justifyContent: "flex-start",
  },
});

export default WaterScreen;

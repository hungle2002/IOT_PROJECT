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

function WaterScreen() {
  const tailwind = useTailwind();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState("1");
  const [progressvalue, setprogressvalue] = useState(0.3);
  const [time, setTime] = useState("1 Phút");
  const [value, setValue] = useState(50);
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
        console.log(response);
        updateSetting(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setprogressvalue((prev) => (prev < 1 ? prev + 0.1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
                onPress={() => setSelectedGarden("1")}
              >
                <Text>Vườn 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rightSmallBox,
                  selectedGarden === "2" && styles.selectedBox,
                ]}
                onPress={() => setSelectedGarden("2")}
              >
                <Text>Vườn 2</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.rightSmallBox,
                selectedGarden === "3" && styles.selectedBox,
              ]}
              onPress={() => setSelectedGarden("3")}
            >
              <Text>Vườn 3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.leftSmallBox}>
              <Text>Tưới nước</Text>
            </TouchableOpacity>
            <View style={styles.leftSmallBox}>
              <Text>Nước hiện có</Text>
              <Text>5000 ml</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <Progress.Circle
              progress={progressvalue}
              size={150}
              showsText={true}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Thời gian còn lại:</Text>
              <Text style={styles.infoText}>{time}</Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Số ml dung dịch đã bơm:</Text>
              <Text style={styles.infoText}>{value} / 500</Text>
            </View>
            <View style={tailwind("flex-1 flex-row justify-between")}>
              <Text style={styles.infoText}>Khu vực tưới</Text>
              <Text style={styles.infoText}>{selectedGarden}</Text>
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  leftSmallBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
    marginLeft: 10,
    alignItems: "center",
    width: "100%",
  },
  selectedBox: {
    backgroundColor: "#00B4D8",
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

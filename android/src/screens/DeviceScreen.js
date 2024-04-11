import { Text, View } from "react-native";
import { Button } from "react-native";
import DeviceItem from "../components/DeviceItem";
import { useTailwind } from "tailwind-rn";
import { StyleSheet, SafeAreaView, SectionList, StatusBar } from "react-native";
import { search } from "../apiServices/searchService";
import React, { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading";

function DeviceScreen({ navigation }) {
  const [reRender, setReRender] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const [DATA, setDATA] = useState([]);
  const fetchAPI = React.useCallback(async () => {
    try {
      const SampleData = [
        {
          title: "Input Sensor",
          data: [],
        },
        {
          title: "Output Motor",
          data: [],
        },
      ];
      const response = await search({ path: `device` });
      response.devices.forEach((e) => {
        if (e.typ == "Sensor") {
          SampleData[0].data.push(e);
        } else SampleData[1].data.push(e);
      });
      setDATA(SampleData);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchAPI();
  }, []);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setReRender(0);
    await fetchAPI();
    setReRender(1);
    setRefreshing(false);
  }, []);
  const tailwind = useTailwind();
  return (
    <View style={tailwind("px-4")}>
      {reRender == 1 && (
        <SectionList
          sections={DATA}
          extraData={DATA}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return item + index;
          }}
          renderItem={({ item }) => {
            return <DeviceItem device={item} />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={tailwind("text-2xl py-5")}>{title}</Text>
          )}
        />
      )}
      {reRender == 0 && (
        <SectionList
          sections={DATA}
          extraData={DATA}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return item + index;
          }}
          renderItem={({ item }) => {
            return <DeviceItem device={item} />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={tailwind("text-2xl py-5")}>{title}</Text>
          )}
        />
      )}
    </View>
  );
}
//
export default DeviceScreen;

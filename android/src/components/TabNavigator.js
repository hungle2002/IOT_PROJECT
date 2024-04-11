import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import {
  DashboardScreen,
  DetectionScreen,
  DeviceScreen,
  ModeScreen,
  SercurityScreen,
  StatisticScreen,
} from "../screens";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faCircleInfo,
  faClock,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const tailwind = useTailwind();
  const [popupState, setPopupState] = React.useState(0);

  // init data
  const notifications = [
    {
      title: " Check up reminder",
      time: 3,
    },
    {
      title: " Catch the dog",
      time: 1,
    },
    {
      title: " Feed pigs in zone A",
      time: 2,
    },
    {
      title: " Clean windows in zone B",
      time: 1.5,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "transparent", // Set the background color of the header
          height: 100,
        },
        headerTitleStyle: {
          fontWeight: "bold", // Set the font weight of the header title
          color: "green", // Set the color of the header title
          fontSize: 25,
        },

        headerLeft: () => (
          <View>
            {popupState == 1 && (
              <View style={tailwind("w-[400px] h-[900px]")}>
                <View>
                  <View
                    style={tailwind("bg-black w-full h-full opacity-10")}
                  ></View>
                  <View
                    style={tailwind(
                      "bg-white w-[300px] absolute right-3 top-[50px] rounded-xl"
                    )}
                  >
                    <View
                      style={tailwind(
                        "flex flex-row justify-between items-center py-3 px-4"
                      )}
                    >
                      <Text style={tailwind("text-black font-bold text-2xl")}>
                        Notifications
                      </Text>
                      <TouchableOpacity onPress={() => setPopupState(0)}>
                        <FontAwesomeIcon icon={faClose} size={25} />
                      </TouchableOpacity>
                    </View>
                    <View style={tailwind("bg-green-100")}>
                      {notifications.map((notification, index) => (
                        <View
                          key={index}
                          style={tailwind(
                            "border-b py-2 mt-1 px-4 flex flex-row justify-between"
                          )}
                        >
                          <View>
                            <Text style={tailwind("text-lg")}>
                              {notification.title}
                            </Text>
                            <View
                              style={tailwind(
                                "flex flex-row items-center pl-2"
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faClock}
                                size={15}
                                color="green"
                              />
                              <Text
                                style={tailwind("text-xs text-zinc-400 pl-1")}
                              >
                                {notification.time} hours ago
                              </Text>
                            </View>
                          </View>
                          <View>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              size={30}
                              color="green"
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        ),
        headerLeftContainerStyle: {
          top: 0,
          left: 0,
          position: "absolute",
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              setPopupState(1);
            }}
          >
            <View>
              <FontAwesomeIcon icon={faBell} size={30} color="green" />
              <Text
                style={tailwind(
                  "text-black text-xs font-semibold absolute -right-1 -top-0.5 rounded-full px-1 bg-blue-300"
                )}
              >
                4
              </Text>
            </View>
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {
          paddingRight: 20, // Set the right padding of the headerRi
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Mode") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          } else if (route.name === "Detection") {
            iconName = focused ? "bug" : "bug-outline";
          } else if (route.name === "Sercurity") {
            iconName = focused ? "business-sharp" : "business-outline";
          } else if (route.name === "Devices") {
            iconName = focused ? "rocket" : "rocket-outline";
          } else if (route.name === "Statistic") {
            iconName = focused ? "analytics" : "analytics-outline";
          }

          // You can add more icons for other screens here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      {/* Add screens here */}
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Devices" component={DeviceScreen} />
      <Tab.Screen name="Statistic" component={StatisticScreen} />
      <Tab.Screen name="Mode" component={ModeScreen} />
      <Tab.Screen name="Detection" component={DetectionScreen} />
      <Tab.Screen name="Sercurity" component={SercurityScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

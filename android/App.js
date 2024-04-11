import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/components/TabNavigator";
import { useEffect } from "react";
import { SocketContext, socket } from "./src/context/socketContext";
function App() {
  // handle socket io connections
  useEffect(() => {
    function onConnect() {
      console.log("Connect to socket successfully!");
    }

    function onDisconnect() {
      console.log("Disconnect to socket successfully!");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <SocketContext.Provider value={socket}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SocketContext.Provider>
    </TailwindProvider>
  );
}
export default App;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const WaterProgressBar = ({ progress }) => {
  const [height, setHeight] = useState(SCREEN_HEIGHT * 0.5); // Adjust the initial height as needed

  const animatedProps = useAnimatedProps(() => {
    return {
      height: withTiming(height * progress, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Svg height={height} width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#00f" stopOpacity="1" />
            <Stop offset="1" stopColor="#00b" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <AnimatedRect
          x="0"
          y={height}
          width="100%"
          animatedProps={animatedProps}
          fill="url(#grad)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaterProgressBar;

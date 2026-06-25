import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDTH } from "@/constants/pipe";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  gapY: number;
  onEnd: () => void;
}

export function Pipe({ gapY, onEnd }: Props) {
  const { height, width } = Dimensions.get("window");
  const topHeight = gapY - GAP_SIZE / 2;
  const bottomY = gapY + GAP_SIZE / 2;
  const bottomHeight = height - bottomY;

  const offset = useSharedValue(0);

  const anymatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(
      width,
      {
        duration: 3000,
        easing: Easing.linear,
      },
      () => runOnJS(onEnd)(),
    );
  }, [offset]);

  return (
    <>
      <Animated.View
        style={[
          styles.pipe,
          { left: width, top: 0, height: topHeight },
          anymatedStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.cap,
          { left: width - 5, top: topHeight - CAP_HEIGHT },
          anymatedStyle,
        ]}
      />

      <Animated.View
        style={[
          styles.pipe,
          { left: width, top: bottomY, height: bottomHeight },
          anymatedStyle,
        ]}
      />
      <Animated.View
        style={[styles.cap, { left: width - 5, top: bottomY }, anymatedStyle]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pipe: {
    position: "absolute",
    width: PIPE_WIDTH,
    backgroundColor: "#2ECC71",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#1B5E20",
  },

  cap: {
    position: "absolute",
    width: PIPE_WIDTH + 10,
    height: CAP_HEIGHT,
    backgroundColor: "#2ECC71",
    borderWidth: 4,
    borderColor: "#1B5E20",
  },
});

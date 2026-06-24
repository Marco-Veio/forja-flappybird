import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function MovingBackground() {
  const { width } = Dimensions.get("window");
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(width, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [offset]);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={require("@/assets/images/ground.png")}
          style={{ width, height: 20 }}
          resizeMode="stretch"
        />

        <Image
          source={require("@/assets/images/ground.png")}
          style={{ width, height: 20 }}
          resizeMode="stretch"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    overflowX: "hidden",
    position: "absolute",
    bottom: 0,
  },
  container: {
    width: "100%",
    flexDirection: "row",
  },
});

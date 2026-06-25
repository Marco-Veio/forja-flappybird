import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDTH } from "@/constants/pipe";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

type Props = {
  x: number;
  gapY: number;
};

export function Pipe({ x, gapY }: Props) {
  const { height } = Dimensions.get("window");
  const topHeight = gapY - GAP_SIZE / 2;
  const bottomY = gapY + GAP_SIZE / 2;
  const bottomHeight = height - bottomY;

  return (
    <>
      <View style={[styles.pipe, { left: x, top: 0, height: topHeight }]} />
      <View
        style={[styles.cap, { left: x - 5, top: topHeight - CAP_HEIGHT }]}
      />

      <View
        style={[styles.pipe, { left: x, top: bottomY, height: bottomHeight }]}
      />
      <View style={[styles.cap, { left: x - 5, top: bottomY }]} />
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

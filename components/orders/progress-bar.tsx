import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "~/theme/colors";

type ProgressBarProps = {
  progress: number; // 0-1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
};

export default function ProgressBar({
  progress,
  height = 6,
  backgroundColor = colors.gray200,
  fillColor = colors.primary400,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.container, { height, backgroundColor, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 166,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});

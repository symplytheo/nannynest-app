import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type NannyInfoCardProps = {
  name: string;
  avatar: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "ongoing" | "awaiting";
};

export default function NannyInfoCard({
  name,
  avatar,
  date,
  startTime,
  endTime,
  status,
}: NannyInfoCardProps) {
  const statusConfig = {
    ongoing: {
      label: "Ongoing",
      backgroundColor: colors.success50,
      textColor: colors.success400,
    },
    awaiting: {
      label: "Awaiting confirmation",
      backgroundColor: colors.success50,
      textColor: colors.success400,
    },
  };

  const config = statusConfig[status];

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <AppText style={styles.name}>{name}</AppText>
        <AppText style={styles.time}>
          {date}, {startTime} - {endTime}
        </AppText>
        <View style={[styles.statusBadge, { backgroundColor: config.backgroundColor }]}>
          <AppText style={[styles.statusText, { color: config.textColor }]}>{config.label}</AppText>
        </View>
      </View>
      <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    lineHeight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

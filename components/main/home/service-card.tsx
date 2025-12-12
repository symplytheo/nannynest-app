import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ServiceCardProps = {
  title: string;
  image: ImageSourcePropType;
  onPress?: () => void;
};

export function ServiceCard({ title, image, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.serviceCard} activeOpacity={0.8} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground} imageStyle={styles.imageStyle}>
        <View style={styles.textContainer}>
          <AppText style={styles.serviceTitle}>{title}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serviceCard: {
    width: 150,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 12,
  },

  textContainer: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.white,
  },
});

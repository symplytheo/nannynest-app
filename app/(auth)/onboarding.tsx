import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

const { width, height } = Dimensions.get("window");

type OnboardingSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: any; // Will use background image
};

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Giving your kids the best child care",
    subtitle: "We connect you with trusted, experienced nannies who provide exceptional care",
    image: require("~/assets/images/partial-react-logo.png"), // Replace with actual background images
  },
  {
    id: "2",
    title: "Find trusted caregivers near you",
    subtitle: "Browse profiles, read reviews, and connect with qualified nannies in your area",
    image: require("~/assets/images/partial-react-logo.png"), // Replace with actual background images
  },
  {
    id: "3",
    title: "Schedule and manage with ease",
    subtitle: "Book appointments, track schedules, and communicate seamlessly",
    image: require("~/assets/images/partial-react-logo.png"), // Replace with actual background images
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login" as any);
  };

  const handleGetStarted = () => {
    router.replace("/(auth)/login" as any);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <ImageBackground source={item.image} style={styles.backgroundImage} resizeMode="cover">
        {/* Overlay gradient */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <AppText style={styles.title}>{item.title}</AppText>
            <AppText style={styles.subtitle}>{item.subtitle}</AppText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Controls */}
      <View style={styles.bottomContainer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <AppButton
                label="Skip"
                variant="text"
                color="brand"
                onPress={handleSkip}
                style={styles.skipButton}
              />
              <AppButton
                label="Next"
                variant="filled"
                color="brand"
                onPress={handleNext}
                style={styles.nextButton}
              />
            </>
          ) : (
            <AppButton
              label="Get Started"
              variant="filled"
              color="brand"
              onPress={handleGetStarted}
              fullWidth
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    width,
    height,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 200,
  },
  textContainer: {
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.white,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
    lineHeight: 24,
    opacity: 0.9,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: colors.primary400,
    width: 24,
  },
  inactiveDot: {
    backgroundColor: colors.gray300,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});

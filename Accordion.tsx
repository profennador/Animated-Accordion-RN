import { useRef } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  heading: string;
  content: string;
}

export default function Accordion({ content, heading }: Props) {
  const contentHeight = useRef<number>(0);
  const animatedContentHeight = useSharedValue<number>(0);

  const animatedContentStyle = useAnimatedStyle(() => ({
    height: animatedContentHeight.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate:
          animatedContentHeight.value === 0
            ? withTiming("0deg")
            : withTiming("-90deg"),
      },
    ],
  }));

  function onLayout(event: LayoutChangeEvent) {
    contentHeight.current = event.nativeEvent.layout.height;
  }

  function toggle() {
    animatedContentHeight.value =
      animatedContentHeight.value === 0
        ? withTiming(contentHeight.current, { duration: 200 })
        : withTiming(0);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle} style={styles.containerHeading}>
        <Text style={styles.textHeading}>{heading}</Text>
        <Animated.Image
          source={require("./Chevron.png")}
          style={[styles.icon, animatedIconStyle]}
        />
      </TouchableOpacity>
      <Animated.View style={animatedContentStyle}>
        <View style={styles.contentAbsolute} onLayout={onLayout}>
          <Text style={styles.textContent}>{content}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#103B57",
    padding: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  containerHeading: { flexDirection: "row", alignItems: "center" },
  contentAbsolute: { position: "absolute", paddingTop: 16 },

  icon: { width: 24, height: 24 },

  textContent: { color: "#f0f0f0" },
  textHeading: {
    color: "#f0f0f0",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
});

import React, { useEffect, FC, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Input from "./Input";
import {Svg, Circle } from "react-native-svg";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useAnimatedProps } from "react-native-reanimated";
import { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {
  width, height
} = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const App : FC = () => {

  const progress = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000})
  }, [])

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: 'absolute' }}> 
        <Circle 
          cx={width / 2} 
          cy={height / 2} 
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle 
          cx={width / 2} 
          cy={height / 2} 
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText: {
    fontSize: 80,
    width: 200,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0
  }
})
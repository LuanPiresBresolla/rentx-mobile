import React from 'react';
import { StyleSheet, Dimensions, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { Container } from './styles';

const WIDTH = Dimensions.get('window').width;

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bounce,
          })
        },
      ],
    }
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  }
});

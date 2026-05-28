import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated'
import { Colors, Shadow } from '@/theme'

interface Props {
  active?: boolean
}

const RING_SIZE_START = 60
const RING_SIZE_END = 280
const ANIMATION_DURATION = 2400

function RadarRing({ delay, active }: { delay: number; active: boolean }) {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (active) {
      scale.value = 0
      opacity.value = 0
      scale.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
          }),
          -1,
          false
        )
      )
      opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(0, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
          }),
          -1,
          false
        )
      )
    } else {
      scale.value = withTiming(0, { duration: 600 })
      opacity.value = withTiming(0, { duration: 600 })
    }
  }, [active])

  const animatedStyle = useAnimatedStyle(() => {
    const size =
      RING_SIZE_START + (RING_SIZE_END - RING_SIZE_START) * scale.value
    const offset = -size / 2
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      opacity: active ? 0.6 - 0.6 * scale.value : opacity.value,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: offset,
      marginLeft: offset,
    }
  })

  return (
    <Animated.View style={[styles.ring, animatedStyle]} />
  )
}

export default function RadarOrb({ active = true }: Props) {
  return (
    <View style={styles.container}>
      {/* Animated rings */}
      <RadarRing delay={0} active={active} />
      <RadarRing delay={600} active={active} />
      <RadarRing delay={1200} active={active} />
      <RadarRing delay={1800} active={active} />

      {/* Center orb */}
      <View style={[styles.orb, active ? styles.orbActive : styles.orbInactive]}>
        <Text style={styles.orbLabel}>YOU</Text>
      </View>

      {/* YOU label below */}
      <View style={styles.labelContainer}>
        <View style={[styles.statusDot, { backgroundColor: active ? Colors.green : Colors.textFaint }]} />
        <Text style={[styles.statusText, { color: active ? Colors.green : Colors.textFaint }]}>
          {active ? 'SCANNING' : 'OFFLINE'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  orb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Shadow.cyan,
  },
  orbActive: {
    backgroundColor: Colors.primary,
  },
  orbInactive: {
    backgroundColor: Colors.surfaceHigh,
    borderWidth: 1.5,
    borderColor: Colors.textFaint,
  },
  orbLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#000000',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
})

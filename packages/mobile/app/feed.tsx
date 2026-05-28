import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated as RNAnimated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import ProfileCapsule from '@/components/ProfileCapsule'
import { Colors, FontSize, Spacing, Radius, Shadow } from '@/theme'
import Svg, { Line } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const CENTER_X = SCREEN_WIDTH / 2
const CENTER_Y = SCREEN_HEIGHT / 2 - 80

// Profile positions relative to screen center
const PROFILES = [
  {
    name: 'Sarah',
    age: 24,
    distance: '12m away',
    locked: true,
    x: CENTER_X - 130,
    y: CENTER_Y - 100,
    lineEnd: { x: CENTER_X - 90, y: CENTER_Y - 60 },
  },
  {
    name: 'Jake',
    age: 31,
    distance: '28m away',
    locked: true,
    x: CENTER_X + 10,
    y: CENTER_Y - 140,
    lineEnd: { x: CENTER_X + 35, y: CENTER_Y - 80 },
  },
  {
    name: 'Mia',
    age: 26,
    distance: '45m away',
    locked: true,
    x: CENTER_X - 100,
    y: CENTER_Y + 80,
    lineEnd: { x: CENTER_X - 40, y: CENTER_Y + 30 },
  },
]

function YouNode() {
  const pulse = useSharedValue(1)

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.25, {
        duration: 1200,
        easing: Easing.inOut(Easing.sine),
      }),
      -1,
      true
    )
  }, [])

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 2 - pulse.value,
  }))

  return (
    <View style={styles.youContainer}>
      <Animated.View style={[styles.youPulse, pulseStyle]} />
      <View style={styles.youNode}>
        <Text style={styles.youText}>YOU</Text>
      </View>
    </View>
  )
}

export default function FeedScreen() {
  const router = useRouter()

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nearby Signals</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>3</Text>
          </View>
        </View>

        {/* Canvas area */}
        <View style={styles.canvas}>
          {/* Connection lines via SVG */}
          <Svg
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            style={StyleSheet.absoluteFillObject}
            pointerEvents="none"
          >
            {PROFILES.map((p, i) => (
              <Line
                key={i}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={p.lineEnd.x}
                y2={p.lineEnd.y}
                stroke={Colors.primary}
                strokeWidth={1}
                strokeOpacity={0.2}
                strokeDasharray="4,6"
              />
            ))}
          </Svg>

          {/* YOU node centered */}
          <View
            style={[
              styles.youWrapper,
              { left: CENTER_X - 32, top: CENTER_Y - 32 },
            ]}
          >
            <YouNode />
          </View>

          {/* Profile capsules */}
          {PROFILES.map((p, i) => (
            <ProfileCapsule
              key={i}
              name={p.name}
              age={p.age}
              distance={p.distance}
              locked={p.locked}
              onPress={() => router.push('/profile')}
              style={[styles.capsule, { left: p.x, top: p.y }]}
            />
          ))}
        </View>

        {/* Bottom info strip */}
        <View style={styles.bottomStrip}>
          <View style={styles.stripLeft}>
            <View style={styles.stripDot} />
            <Text style={styles.stripText}>3 signals detected · Bondi Beach</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={styles.unlockCta}
          >
            <Text style={styles.unlockCtaText}>🔓 Unlock Photos €9/mo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDeep,
  },
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {
    color: Colors.text,
    fontSize: FontSize.lg,
    lineHeight: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: FontSize.lg,
    fontFamily: 'InterBold',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: FontSize.sm,
    fontFamily: 'InterBold',
    color: '#000000',
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  youWrapper: {
    position: 'absolute',
    zIndex: 10,
  },
  youContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youPulse: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    opacity: 0.15,
  },
  youNode: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.cyan,
  },
  youText: {
    fontSize: 9,
    fontFamily: 'InterExtraBold',
    color: Colors.primary,
    letterSpacing: 1.5,
  },
  capsule: {
    position: 'absolute',
    zIndex: 5,
  },
  bottomStrip: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stripLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stripDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.green,
  },
  stripText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontFamily: 'Inter',
  },
  unlockCta: {
    backgroundColor: 'rgba(255,90,95,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: 'rgba(255,90,95,0.4)',
  },
  unlockCtaText: {
    fontSize: FontSize.sm,
    color: Colors.coral,
    fontFamily: 'InterSemiBold',
  },
})

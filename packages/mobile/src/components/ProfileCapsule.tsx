import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Colors, Radius, FontSize, Spacing, Shadow } from '@/theme'

interface Props {
  name: string
  age: number
  distance: string
  locked: boolean
  onPress?: () => void
  style?: ViewStyle
}

export default function ProfileCapsule({
  name,
  age,
  distance,
  locked,
  onPress,
  style,
}: Props) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, style]}
    >
      {/* Avatar area */}
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={['#141B38', '#0A2A40']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          {!locked && (
            <Text style={styles.initial}>{initial}</Text>
          )}
        </LinearGradient>

        {/* Lock blur overlay */}
        {locked && (
          <BlurView intensity={85} tint="dark" style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </BlurView>
        )}
      </View>

      {/* Info area */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {locked ? '••••' : name}, {age}
        </Text>
        <View style={styles.distanceRow}>
          <View style={styles.distanceDot} />
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      </View>

      {/* Unlock pill if locked */}
      {locked && (
        <View style={styles.unlockPill}>
          <Text style={styles.unlockText}>Unlock €9/mo</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(10,15,36,0.85)',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
    ...Shadow.cyan,
  },
  avatarWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.primary,
    opacity: 0.8,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 22,
  },
  info: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  distanceText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontFamily: 'SpaceMono',
  },
  unlockPill: {
    marginTop: Spacing.xs,
    backgroundColor: 'rgba(255,90,95,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,90,95,0.4)',
  },
  unlockText: {
    fontSize: 9,
    color: Colors.coral,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
})

import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { Colors, Radius } from '@/theme'

interface Props {
  children: React.ReactNode
  style?: ViewStyle
  intensity?: number
}

export default function GlassCard({ children, style, intensity = 20 }: Props) {
  return (
    <BlurView intensity={intensity} tint="dark" style={[styles.container, style]}>
      <View style={styles.overlay}>
        {children}
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderCyan,
  },
  overlay: {
    backgroundColor: 'rgba(10,15,36,0.65)',
    flex: 1,
  },
})

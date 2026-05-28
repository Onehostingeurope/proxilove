import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing } from '@/theme'

interface Props {
  distance: string
  style?: object
}

export default function DistanceBadge({ distance, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.dot} />
      <Text style={styles.text}>{distance}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,230,118,0.1)',
    borderRadius: 999,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: 5,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green,
    ...{
      shadowColor: Colors.green,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
  },
  text: {
    fontSize: FontSize.xs,
    color: Colors.green,
    fontFamily: 'SpaceMono',
    letterSpacing: 0.5,
  },
})

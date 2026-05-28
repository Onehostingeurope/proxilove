import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize, Spacing, Radius } from '@/theme'

interface Props {
  text: string
  isOwn: boolean
  time: string
}

export default function MessageBubble({ text, isOwn, time }: Props) {
  return (
    <View style={[styles.wrapper, isOwn ? styles.wrapperOwn : styles.wrapperOther]}>
      <View
        style={[
          styles.bubble,
          isOwn ? styles.bubbleOwn : styles.bubbleOther,
        ]}
      >
        <Text style={[styles.text, isOwn ? styles.textOwn : styles.textOther]}>
          {text}
        </Text>
      </View>
      <Text style={[styles.time, isOwn ? styles.timeOwn : styles.timeOther]}>
        {time}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Spacing.xs,
    maxWidth: '78%',
  },
  wrapperOwn: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: Spacing.md,
  },
  wrapperOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: Spacing.md,
  },
  bubble: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
  },
  bubbleOwn: {
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.35)',
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    fontSize: FontSize.md,
    lineHeight: 22,
  },
  textOwn: {
    color: Colors.text,
  },
  textOther: {
    color: Colors.text,
  },
  time: {
    fontSize: FontSize.xs,
    marginTop: 4,
    color: Colors.textFaint,
    fontFamily: 'SpaceMono',
  },
  timeOwn: {
    marginRight: Spacing.xs,
  },
  timeOther: {
    marginLeft: Spacing.xs,
  },
})

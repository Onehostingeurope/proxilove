import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { Colors, Radius, FontSize, Shadow, Spacing } from '@/theme'

type Variant = 'primary' | 'coral' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  label: string
  onPress: () => void
  variant?: Variant
  size?: Size
  icon?: string
  disabled?: boolean
  style?: ViewStyle
}

export default function StitchButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  style,
}: Props) {
  const containerStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    disabled && styles.disabled,
    style,
  ]

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`textSize_${size}`],
    styles[`textVariant_${variant}`],
    disabled && styles.textDisabled,
  ]

  const shadowStyle =
    variant === 'primary'
      ? Shadow.cyan
      : variant === 'coral'
      ? Shadow.coral
      : undefined

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[containerStyle, shadowStyle]}
    >
      <Text style={textStyle}>
        {icon ? `${icon}  ${label}` : label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Sizes
  size_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    minWidth: 80,
  },
  size_md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    minWidth: 120,
  },
  size_lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minWidth: 180,
  },

  // Variants
  variant_primary: {
    backgroundColor: Colors.primary,
  },
  variant_coral: {
    backgroundColor: Colors.coral,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },

  // Disabled
  disabled: {
    opacity: 0.4,
  },

  // Text base
  text: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Text sizes
  textSize_sm: {
    fontSize: FontSize.sm,
  },
  textSize_md: {
    fontSize: FontSize.md,
  },
  textSize_lg: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },

  // Text variants
  textVariant_primary: {
    color: '#000000',
  },
  textVariant_coral: {
    color: '#FFFFFF',
  },
  textVariant_outline: {
    color: Colors.primary,
  },
  textVariant_ghost: {
    color: Colors.textMuted,
  },
  textDisabled: {
    opacity: 0.6,
  },
})

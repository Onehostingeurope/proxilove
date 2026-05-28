import React, { useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import StitchButton from '@/components/StitchButton'
import { Colors, FontSize, Spacing, Radius, Shadow } from '@/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const HERO_SIZE = SCREEN_WIDTH * 0.85

const INTERESTS = [
  { icon: '🏄', label: 'Surfing' },
  { icon: '☕', label: 'Coffee' },
  { icon: '🎵', label: 'Music' },
  { icon: '🌊', label: 'Beach' },
  { icon: '📸', label: 'Photography' },
]

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero blurred image */}
          <View style={styles.heroWrapper}>
            <LinearGradient
              colors={['#141B38', '#0A1A30', '#0D2A40', '#071020']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            />
            <BlurView intensity={90} tint="dark" style={styles.heroBlur}>
              {/* Lock icon centered */}
              <View style={styles.lockCenter}>
                <Text style={styles.lockEmoji}>🔒</Text>
                <Text style={styles.lockHint}>Photo Locked</Text>
              </View>
            </BlurView>

            {/* Bottom glass paywall card */}
            <View style={styles.paywallCard}>
              <BlurView intensity={40} tint="dark" style={styles.paywallBlur}>
                <View style={styles.paywallContent}>
                  <Text style={styles.paywallEyebrow}>👀 12 Meters Away</Text>
                  <Text style={styles.paywallHeadline}>
                    See Who Is Right{'\n'}Next To You
                  </Text>
                  <Text style={styles.paywallBody}>
                    Unlock crystal-clear profile pictures of people nearby for €9/month
                  </Text>
                  <StitchButton
                    label="Unlock Full Access — €9/mo"
                    onPress={() => {}}
                    variant="coral"
                    size="lg"
                    style={styles.unlockButton}
                  />
                </View>
              </BlurView>
            </View>
          </View>

          {/* Profile info section */}
          <View style={styles.profileSection}>
            {/* Name + distance */}
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>Sarah, 24</Text>
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.locationBadge}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Bondi Beach, NSW</Text>
              <View style={styles.locationSep} />
              <Text style={styles.distanceText}>12m away</Text>
            </View>

            {/* Bio */}
            <View style={styles.bioCard}>
              <Text style={styles.bioText}>
                Surf obsessed 🏄‍♀️ · Coffee addict · Looking for adventures nearby
              </Text>
            </View>

            {/* Interests */}
            <Text style={styles.sectionLabel}>Interests</Text>
            <View style={styles.interestRow}>
              {INTERESTS.map((item) => (
                <View key={item.label} style={styles.interestChip}>
                  <Text style={styles.interestIcon}>{item.icon}</Text>
                  <Text style={styles.interestLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            {/* Send Stitch CTA */}
            <View style={styles.ctaWrapper}>
              <StitchButton
                label="Send Proxilove Request"
                onPress={() => router.push('/chat')}
                variant="outline"
                size="lg"
                icon="✂"
                style={styles.stitchCta}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(10,15,36,0.75)',
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
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(10,15,36,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeIcon: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  // Hero section
  heroWrapper: {
    width: '100%',
    height: HERO_SIZE,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroBlur: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockCenter: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  lockEmoji: {
    fontSize: 52,
  },
  lockHint: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontFamily: 'InterSemiBold',
    letterSpacing: 1,
  },
  paywallCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.borderCyan,
    overflow: 'hidden',
  },
  paywallBlur: {
    backgroundColor: 'rgba(10,15,36,0.5)',
  },
  paywallContent: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  paywallEyebrow: {
    fontSize: FontSize.xl,
    fontFamily: 'InterExtraBold',
    color: Colors.primary,
  },
  paywallHeadline: {
    fontSize: FontSize.xxl,
    fontFamily: 'InterExtraBold',
    color: Colors.text,
    lineHeight: 34,
  },
  paywallBody: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  unlockButton: {
    marginTop: Spacing.sm,
    alignSelf: 'stretch',
  },

  // Profile section
  profileSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  nameText: {
    fontSize: FontSize.display,
    fontFamily: 'InterExtraBold',
    color: Colors.text,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.green,
    ...Shadow.green,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationIcon: {
    fontSize: FontSize.sm,
  },
  locationText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontFamily: 'InterSemiBold',
  },
  locationSep: {
    width: 1,
    height: 12,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs,
  },
  distanceText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontFamily: 'SpaceMono',
  },
  bioCard: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bioText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontFamily: 'InterBold',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  interestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: 'rgba(0,240,255,0.08)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.borderCyan,
  },
  interestIcon: {
    fontSize: FontSize.md,
  },
  interestLabel: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontFamily: 'InterSemiBold',
  },
  ctaWrapper: {
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  stitchCta: {
    width: '100%',
  },
})

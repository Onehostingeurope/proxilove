import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import RadarOrb from '@/components/RadarOrb'
import StitchButton from '@/components/StitchButton'
import { Colors, FontSize, Spacing, Radius, Shadow } from '@/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function HomeScreen() {
  const router = useRouter()
  const [radarActive, setRadarActive] = useState(true)

  return (
    <View style={styles.root}>
      {/* Radial gradient background */}
      <LinearGradient
        colors={['rgba(0,240,255,0.07)', 'transparent', 'transparent']}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Secondary glow */}
      <LinearGradient
        colors={['transparent', 'rgba(0,240,255,0.04)', 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>STITCH</Text>
            <View style={styles.logoUnderline} />
          </View>

          {/* Radar toggle pill */}
          <TouchableOpacity
            onPress={() => setRadarActive(!radarActive)}
            activeOpacity={0.8}
            style={[
              styles.radarPill,
              radarActive ? styles.radarPillActive : styles.radarPillInactive,
            ]}
          >
            <View
              style={[
                styles.radarDot,
                { backgroundColor: radarActive ? Colors.green : Colors.textFaint },
              ]}
            />
            <Text
              style={[
                styles.radarPillText,
                { color: radarActive ? Colors.green : Colors.textFaint },
              ]}
            >
              RADAR: {radarActive ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Center Orb */}
        <View style={styles.orbContainer}>
          <RadarOrb active={radarActive} />
        </View>

        {/* Status text */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: radarActive ? Colors.primary : Colors.textFaint }]} />
            <Text style={[styles.statusText, { color: radarActive ? Colors.text : Colors.textFaint }]}>
              {radarActive
                ? 'Active scanning on the beach… 4 signals pulsing nearby'
                : 'Radar is off. No signals being received.'}
            </Text>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Bondi Beach, NSW</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.actions}>
          <StitchButton
            label="View Nearby"
            onPress={() => router.push('/feed')}
            variant="outline"
            size="lg"
            icon="→"
            style={styles.viewButton}
          />

          <StitchButton
            label={`Go Invisible / Stealth Mode`}
            onPress={() => {}}
            variant="ghost"
            size="sm"
            icon="👁"
          />
        </View>

        {/* Signal count footer */}
        {radarActive && (
          <View style={styles.footer}>
            <View style={styles.signalBadge}>
              <Text style={styles.signalCount}>4</Text>
              <Text style={styles.signalLabel}>signals nearby</Text>
            </View>
            <View style={styles.signalBadge}>
              <Text style={styles.signalCount}>12</Text>
              <Text style={styles.signalLabel}>meters closest</Text>
            </View>
            <View style={styles.signalBadge}>
              <Text style={styles.signalCount}>3</Text>
              <Text style={styles.signalLabel}>new today</Text>
            </View>
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerLeft: {
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 22,
    fontFamily: 'InterExtraBold',
    color: Colors.text,
    letterSpacing: 6,
  },
  logoUnderline: {
    height: 2,
    width: 28,
    backgroundColor: Colors.primary,
    marginTop: 3,
    borderRadius: 1,
  },
  radarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    gap: 7,
    borderWidth: 1,
  },
  radarPillActive: {
    backgroundColor: 'rgba(0,230,118,0.1)',
    borderColor: 'rgba(0,230,118,0.3)',
  },
  radarPillInactive: {
    backgroundColor: 'rgba(144,144,151,0.1)',
    borderColor: 'rgba(144,144,151,0.2)',
  },
  radarDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  radarPillText: {
    fontSize: FontSize.xs,
    fontFamily: 'InterBold',
    letterSpacing: 1.5,
  },
  orbContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing.lg,
  },
  statusContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: FontSize.md,
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 22,
    flexShrink: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    opacity: 0.7,
  },
  locationIcon: {
    fontSize: 13,
  },
  locationText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontFamily: 'InterSemiBold',
  },
  actions: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  viewButton: {
    width: '80%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  signalBadge: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
  },
  signalCount: {
    fontSize: FontSize.xl,
    fontFamily: 'InterExtraBold',
    color: Colors.primary,
  },
  signalLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontFamily: 'Inter',
    marginTop: 2,
  },
})

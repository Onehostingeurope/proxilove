import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import MessageBubble from '@/components/MessageBubble'
import StitchButton from '@/components/StitchButton'
import { Colors, FontSize, Spacing, Radius, Shadow } from '@/theme'

interface ChatMessage {
  id: string
  text: string
  isOwn: boolean
  time: string
}

const MESSAGES: ChatMessage[] = [
  {
    id: '1',
    text: 'Hey! Are you at Bondi Beach right now? 🌊',
    isOwn: false,
    time: '2:41 PM',
  },
  {
    id: '2',
    text: 'Yes! Near the lifeguard tower! Small world haha',
    isOwn: true,
    time: '2:42 PM',
  },
  {
    id: '3',
    text: 'Haha! I can see you in the radar 👀',
    isOwn: false,
    time: '2:42 PM',
  },
  {
    id: '4',
    text: 'This app is wild. Want to grab a coffee?',
    isOwn: true,
    time: '2:43 PM',
  },
  {
    id: '5',
    text: 'Definitely! Give me 5 mins ☕',
    isOwn: false,
    time: '2:44 PM',
  },
]

export default function ChatScreen() {
  const router = useRouter()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(MESSAGES)
  const [handshakePending, setHandshakePending] = useState(true)
  const flatListRef = useRef<FlatList>(null)

  const sendMessage = () => {
    if (!messageText.trim()) return
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: messageText.trim(),
      isOwn: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, newMsg])
    setMessageText('')
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const renderItem: ListRenderItem<ChatMessage> = ({ item }) => (
    <MessageBubble text={item.text} isOwn={item.isOwn} time={item.time} />
  )

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>S</Text>
          </View>

          <Text style={styles.headerName}>Sarah</Text>

          <View style={{ flex: 1 }} />

          {/* Sever button */}
          <TouchableOpacity style={styles.severBtn}>
            <Text style={styles.severText}>✂ Sever</Text>
          </TouchableOpacity>
        </View>

        {/* Bluetooth range banner */}
        <View style={styles.rangeBanner}>
          <View style={styles.rangeDot} />
          <Text style={styles.rangeText}>In Bluetooth Range (12m)</Text>
        </View>

        {/* Handshake banner */}
        {handshakePending && (
          <View style={styles.handshakeCard}>
            <View style={styles.coralBar} />
            <View style={styles.handshakeAvatarCircle}>
              <Text style={styles.handshakeAvatarText}>S</Text>
            </View>
            <View style={styles.handshakeInfo}>
              <Text style={styles.handshakeTitle}>Sarah wants to Stitch!</Text>
              <Text style={styles.handshakeDistance}>12 meters away</Text>
            </View>
            <View style={styles.handshakeActions}>
              <TouchableOpacity
                onPress={() => setHandshakePending(false)}
                style={styles.declineBtn}
              >
                <Text style={styles.declineBtnText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setHandshakePending(false)}
                style={styles.acceptBtn}
              >
                <Text style={styles.acceptBtnText}>Accept ✓</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Messages list */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />

          {/* Input tray */}
          <View style={styles.inputTray}>
            <TextInput
              style={styles.input}
              placeholder="Send a message..."
              placeholderTextColor={Colors.textFaint}
              value={messageText}
              onChangeText={setMessageText}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              multiline={false}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={[styles.sendBtn, messageText.trim() ? styles.sendBtnActive : styles.sendBtnInactive]}
            >
              <Text style={[styles.sendIcon, messageText.trim() ? styles.sendIconActive : styles.sendIconInactive]}>
                ↑
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: FontSize.md,
    fontFamily: 'InterBold',
    color: Colors.primary,
  },
  headerName: {
    fontSize: FontSize.lg,
    fontFamily: 'InterBold',
    color: Colors.text,
  },
  severBtn: {
    backgroundColor: 'rgba(255,90,95,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: 'rgba(255,90,95,0.4)',
  },
  severText: {
    fontSize: FontSize.sm,
    color: Colors.coral,
    fontFamily: 'InterSemiBold',
  },

  // Range banner
  rangeBanner: {
    backgroundColor: 'rgba(0,230,118,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,230,118,0.2)',
  },
  rangeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.green,
  },
  rangeText: {
    fontSize: FontSize.sm,
    color: Colors.green,
    fontFamily: 'InterSemiBold',
    letterSpacing: 0.3,
  },

  // Handshake card
  handshakeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,90,95,0.3)',
    overflow: 'hidden',
    padding: Spacing.md,
    paddingLeft: Spacing.sm,
  },
  coralBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.coral,
  },
  handshakeAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  handshakeAvatarText: {
    fontSize: FontSize.md,
    fontFamily: 'InterBold',
    color: Colors.primary,
  },
  handshakeInfo: {
    flex: 1,
    gap: 2,
  },
  handshakeTitle: {
    fontSize: FontSize.sm,
    fontFamily: 'InterBold',
    color: Colors.text,
  },
  handshakeDistance: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontFamily: 'SpaceMono',
  },
  handshakeActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  declineBtn: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  declineBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontFamily: 'InterSemiBold',
  },
  acceptBtn: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.green,
    ...Shadow.green,
  },
  acceptBtnText: {
    fontSize: FontSize.sm,
    color: '#000000',
    fontFamily: 'InterBold',
  },

  // Messages
  messagesList: {
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  // Input tray
  inputTray: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    color: Colors.text,
    fontSize: FontSize.md,
    fontFamily: 'Inter',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.primary,
    ...Shadow.cyan,
  },
  sendBtnInactive: {
    backgroundColor: Colors.surfaceHigh,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendIcon: {
    fontSize: FontSize.lg,
    fontFamily: 'InterBold',
  },
  sendIconActive: {
    color: '#000000',
  },
  sendIconInactive: {
    color: Colors.textFaint,
  },
})

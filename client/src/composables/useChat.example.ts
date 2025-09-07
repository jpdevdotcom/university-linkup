// This is a placeholder for the real chat implementation.
// Replace with your own WebSocket or API logic.

import { ref } from 'vue'

export interface Message {
  id: number
  sender: 'me' | 'other' | 'system'
  text: string
  status?: 'pending' | 'sent' | 'failed' | 'disconnected'
}

const messages = ref<Message[]>([])
const connected = ref(false)
const chatmate = ref<{ nickname: string; course: string } | null>(null)

const connect = () => {
  console.warn('⚠️ useChat: This is a stub. Implement your own connect logic.')
}
const sendMessage = (text: string) => {
  console.warn('⚠️ useChat: sendMessage not implemented.', text)
}
const disconnect = () => {
  console.warn('⚠️ useChat: disconnect not implemented.')
}

export function useChat() {
  return { connect, sendMessage, disconnect, connected, messages, chatmate }
}

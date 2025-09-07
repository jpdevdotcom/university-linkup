import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStateStore = defineStore('chatState', () => {
  const isDisconnected = ref(false)

  const disconnect = () => {
    isDisconnected.value = true
  }

  const reconnect = () => {
    isDisconnected.value = false
  }

  return {
    isDisconnected,
    disconnect,
    reconnect,
  }
})

import { useChat } from '@/composables/useChat'
import { useChatStateStore } from '@/stores/chat-state'
import { type Router } from 'vue-router'

const handleDisconnect = (router: Router) => {
  const { disconnect } = useChat()
  const chatState = useChatStateStore()

  disconnect()
  chatState.disconnect()
  router.push('/')
}

export { handleDisconnect }

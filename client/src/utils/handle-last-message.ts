import { useChat, type Message } from '@/composables/useChat'

const { messages } = useChat()

const isLastMyMessage = (msg: Message) => {
  const myMessages = messages.value.filter((m) => m.sender === 'me')
  return myMessages.length > 0 && myMessages[myMessages.length - 1].id === msg.id
}

export { isLastMyMessage }

import { nextTick, ref } from 'vue'

const chatContainer = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
let scrollTimeout: number | undefined

const handleScroll = () => {
  isScrolling.value = true
  clearTimeout(scrollTimeout)
  scrollTimeout = window.setTimeout(() => {
    isScrolling.value = false
  }, 1000)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

export { scrollToBottom, handleScroll, chatContainer, isScrolling }

<script setup lang="ts">
import { Button, InputText } from 'primevue'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useChat } from '@/composables/useChat'
import { useChatStateStore } from '@/stores/chat-state'
import { chatContainer, handleScroll, isScrolling, scrollToBottom } from '@/utils/handle-scroll'
import { isLastMyMessage } from '@/utils/handle-last-message'
import { handleDisconnect } from '@/utils/handle-disconnect'

const { messages, sendMessage, connected, chatmate, chat_room } = useChat()
const chatState = useChatStateStore()

const newMessage = ref('')
const router = useRouter()

const handleSend = () => {
  if (!newMessage.value.trim()) return
  sendMessage(newMessage.value)
  newMessage.value = ''
}

onMounted(() => {
  if (!connected.value || !chat_room) {
    router.push('/')
  }
})

watch(
  messages,
  () => {
    scrollToBottom()
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div class="flex h-screen w-full pt-20 md:pt-8 bg-white">
    <div
      class="hidden md:flex flex-col justify-between w-xs py-7 md:px-5 text-black border-r border-gray-200"
    >
      <div class="flex flex-col items-center gap-5">
        <img src="/logo.jpeg" alt="Logo" class="w-28 mx-5" />
        <Button
          @click="() => handleDisconnect(router)"
          size="small"
          class="text-sm py-2 text-gray-800 flex items-center gap-2 w-full justify-center rounded-md !bg-red-100 border !border-red-200 hover:!bg-red-200 hover:!border-red-500 transition-all ease-in-out"
        >
          <i class="pi pi-sign-out" />
          <span class="hidden md:block !text-gray-800">Leave Chat</span>
        </Button>

        <p class="text-sm block lg:hidden text-center !text-gray-500">
          Be kind and respectful — good chats make this app better for everyone
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <a
          href="https://github.com/jpdevdotcom/uep-linkup/issues"
          target="_blank"
          class="py-2 px-3 w-full flex items-center gap-2 text-sm border rounded-md border-gray-300 hover:bg-gray-100 transition-all ease-in-out"
        >
          <i class="pi pi-github" />
          <span class="hidden md:block">Report an issue</span>
        </a>
        <a
          href="https://github.com/jpdevdotcom/uep-linkup/issues"
          target="_blank"
          class="py-2 px-3 w-full flex items-center gap-2 text-sm border rounded-md border-gray-300 hover:bg-gray-100 transition-all ease-in-out"
        >
          <i class="pi pi-github" />
          <span class="hidden md:block">Contribute to LookUp</span>
        </a>
      </div>
    </div>

    <div class="flex flex-col w-full p-5">
      <div class="flex md:hidden mb-5 gap-3 items-center justify-center">
        <div class="bg-blue-100 py-3 px-5 rounded-lg">
          <p class="text-sm text-center">
            <span>You are now talking with </span
            ><span class="font-bold !text-blue-500">{{ chatmate?.nickname }}</span
            ><span>, a {{ chatmate?.course }} student</span>
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-xs !text-gray-500 text-center">Feeling off?</p>
          <Button
            @click="() => handleDisconnect(router)"
            label="Disconnect"
            size="small"
            class="!bg-red-500 !border !border-red-300"
          />
        </div>
      </div>

      <div
        @scroll="handleScroll"
        :class="[
          'max-h-screen h-full overflow-y-auto px-3 space-y-2 custom-scrollbar',
          isScrolling || (chatContainer && chatContainer.scrollHeight > chatContainer.clientHeight)
            ? 'scrolling'
            : '',
        ]"
        ref="chatContainer"
      >
        <p
          v-for="msg in messages"
          :key="msg.id"
          class="flex flex-col"
          :class="msg.sender === 'me' ? 'items-end' : 'items-start'"
        >
          <span
            class="max-w-full md:max-w-md px-4 py-2 rounded-2xl text-sm break-words"
            :class="[
              msg.sender === 'me'
                ? 'bg-blue-500 !text-white rounded-br-none'
                : msg.sender === 'system'
                  ? msg.status === 'disconnected'
                    ? 'bg-red-100 text-xs border border-red-300 text-gray-700 text-center mx-auto rounded-full'
                    : 'bg-yellow-100 border text-xs border-yellow-300 text-gray-700 text-center mx-auto rounded-full'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none',
              msg.status === 'pending' ? 'opacity-60 italic' : '',
            ]"
          >
            {{ msg.text }}
          </span>

          <span
            v-if="msg.sender === 'me' && isLastMyMessage(msg)"
            class="text-xs text-gray-400 mt-1"
          >
            {{
              msg.status === 'pending'
                ? 'Sending...'
                : msg.status === 'failed'
                  ? 'Failed to send'
                  : 'Sent'
            }}
          </span>
        </p>
      </div>

      <div class="pt-5 flex gap-3">
        <InputText
          v-model="newMessage"
          :disabled="chatState.isDisconnected"
          placeholder="Type a message..."
          class="flex-1 disabled:cursor-not-allowed disabled:!bg-[#dfdfdf] !bg-[#efefef] !border-none !border-[#bdbdbd]"
          @keyup.enter="handleSend"
        />
        <Button
          icon="pi pi-send"
          :disabled="chatState.isDisconnected"
          size="small"
          class="!text-red-500 disabled:!cursor-not-allowed disabled:hover:!bg-[#1877F2] !px-5"
          @click="handleSend"
        />
      </div>
    </div>

    <div class="py-5 pr-5 hidden lg:block w-[25rem]">
      <div class="bg-gray-100 rounded-lg p-7 flex flex-col justify-between h-full">
        <div class="space-y-3">
          <div>
            <h2 class="text-blue-500 break-words text-2xl font-bold">
              {{ chatmate?.nickname }}
            </h2>
            <span class="text-sm !text-gray-400">Nickname</span>
          </div>

          <div>
            <h2 class="text-gray-700 break-words text-lg">
              {{ chatmate?.course }}
            </h2>
            <span class="text-sm !text-gray-400">Course</span>
          </div>
        </div>

        <div class="space-y-5">
          <blockquote class="italic text-gray-800">
            College is stressful… talking to someone might just be the easiest assignment you ace
            today.
          </blockquote>

          <p class="bg-gray-200 border border-gray-300 pl-4 pr-2 py-2 text-yellow-800 rounded">
            <span class="font-bold">Friendly reminder:</span> Be kind, respectful, and mindful while
            chatting. Healthy conversations make the app enjoyable for everyone!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

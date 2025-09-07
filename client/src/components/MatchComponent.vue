<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Button, InputText, Message, Select } from 'primevue'
import { useRouter } from 'vue-router'
import { useChat } from '@/composables/useChat'
import { decryptNickname, encryptNickname } from '@/utils/nn-decode'
import { LS_KEY } from '@/config/secrets'
import { registerNickname } from '@/api/register-nn'

import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'

import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { courses } from '@/data/courses'

const router = useRouter()
const { connect, matched, findingMatch } = useChat()
const nickname = ref('')
const isRegistered = ref(false)
const errorMessage = ref<string | null>(null)
const isRegisterSuccess = ref<boolean>(true)

const resolver = zodResolver(
  z.object({
    nickname: z
      .string()
      .min(1, { message: 'Nickname is required.' })
      .regex(/^\S+$/, { message: 'Nickname cannot contain spaces.' }),
  }),
)
const courseResolver = zodResolver(
  z.object({
    course: z.enum(courses, {
      required_error: 'Course is required.',
      invalid_type_error: 'Invalid course selected.',
    }),
    preferredCourse: z.enum(courses, {
      required_error: 'Course is required.',
      invalid_type_error: 'Invalid course selected.',
    }),
  }),
)

const isValidating = ref<boolean>(false)

onMounted(() => {
  const saved = localStorage.getItem(LS_KEY)
  if (saved) {
    nickname.value = decryptNickname(saved)
    isRegistered.value = true
  }
})

async function validateNameRegistration(event: FormSubmitEvent<Record<string, unknown>>) {
  try {
    isValidating.value = true
    isRegisterSuccess.value = true

    if (!isRegistered.value && event.valid) {
      await registerNickname(nickname.value)
      localStorage.setItem(LS_KEY, encryptNickname(nickname.value))
      isRegistered.value = true
    }
  } catch (err) {
    if (err instanceof Error) {
      errorMessage.value = err.message
      isRegisterSuccess.value = false
    } else errorMessage.value = 'An unexpected error occurred'
  } finally {
    isValidating.value = false
  }
}

const joinChat = async (event: FormSubmitEvent<Record<string, unknown>>): Promise<void> => {
  try {
    if (event.valid) {
      console.log(event.values.preferredCourse)
      errorMessage.value = null
      connect(nickname.value, event.values.course as string, event.values.preferredCourse as string)
    }
  } catch (err) {
    if (err instanceof Error) errorMessage.value = err.message
    else errorMessage.value = 'An unexpected error occurred'
  }
}

watch(matched, (isMatched) => {
  if (isMatched) {
    router.push('/chat')
  }
})
</script>

<template>
  <div class="flex flex-col gap-5 justify-center max-w-sm mx-auto min-h-screen">
    <Message v-if="!isRegisterSuccess" severity="error" size="small">{{ errorMessage }}</Message>
    <div class="bg-[#FFFFFF] drop-shadow-sm rounded-md p-7">
      <div v-if="!isRegistered">
        <Form :resolver @submit="validateNameRegistration">
          <FormField v-slot="$field" name="nickname" initialValue="" class="flex flex-col gap-5">
            <div class="flex flex-col flex-wrap gap-2">
              <label class="text-sm !text-[#828282]">Your nickname in chat</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                $field.error?.message
              }}</Message>
              <InputText v-model="nickname" placeholder="Enter your nickname" class="w-full" />
              <label class="text-xs !text-[#828282] italic">P.S. keep your real name private</label>
            </div>

            <Button label="Register Nickname" type="submit" size="small" :loading="isValidating" />
          </FormField>
        </Form>
      </div>

      <div v-else class="flex flex-col gap-5">
        <div class="text-gray-700 font-semibold text-center text-xl px-5">
          <p>
            Yo <span class="!font-bold !text-[#1877F2]">{{ nickname }}</span
            >!
          </p>
          <span>You’re in — ready to connect with others?</span>
        </div>

        <div>
          <p class="text-sm text-center !text-[#828282]">
            Let us know your course and who you’d like to talk to — we’ll do the matching!
          </p>
        </div>

        <Form :resolver="courseResolver" @submit="joinChat" class="flex flex-col gap-3">
          <FormField v-slot="$field" name="course" class="flex flex-col gap-1">
            <label class="text-sm !text-[#828282]">I’m taking</label>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              {{ $field.error?.message }}
            </Message>
            <Select
              v-bind="$field"
              :options="[...courses]"
              filter
              size="small"
              placeholder="Select your current course"
            />
          </FormField>

          <FormField v-slot="$field" name="preferredCourse" class="flex flex-col gap-1">
            <label class="text-sm !text-[#828282]">Looking to meet a</label>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
              {{ $field.error?.message }}
            </Message>
            <Select
              v-bind="$field"
              :options="[...courses]"
              filter
              size="small"
              placeholder="Select preferred course"
              class="!text-white"
            />
          </FormField>

          <Button
            type="submit"
            :label="findingMatch ? 'Cancel' : 'Join Chat'"
            :class="findingMatch ? '!bg-red-500 !border !border-red-300' : ''"
            size="small"
          />
        </Form>

        <Message
          v-if="findingMatch"
          size="small"
          severity="warn"
          class="flex items-center justify-center animate-pulse"
          ><span class="animate-spin">⏳</span> Finding a match...</Message
        >
      </div>
    </div>
  </div>
</template>

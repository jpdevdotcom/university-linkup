<script setup lang="ts">
import { Toast } from 'primevue'
</script>

<template>
  <Toast position="top-center" />
  <div class="fixed top-0 left-0 right-0">
    <div class="bg-blue-100 border-b border-[#91A6F1] px-5 py-2 text-center">
      <h4 class="text-xs md:text-sm flex items-center justify-center gap-2">
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
        </span>

        <span class="!text-blue-500">Early Beta access — we’d love your feedback!</span>
      </h4>
    </div>

    <div class="bg-gray-100 px-5 py-2 text-center block md:hidden">
      <h4 class="text-gray-500 text-xs">
        Be kind and respectful — good chats make this app better for everyone
      </h4>
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>

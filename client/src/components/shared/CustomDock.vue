<script setup lang="ts">
import Dock from '../ui/dock/Dock.vue'
import DockIcon from '../ui/dock/DockIcon.vue'
import DockSeparator from '../ui/dock/DockSeparator.vue'
</script>

<template>
  <Dock class="mb-6 fixed left-0 right-0 top-0">
    <DockIcon>
      <i class="pi pi-home !text-black"></i>
    </DockIcon>
    <DockSeparator />
    <DockIcon>
      <i class="pi pi-home !text-black"></i>
    </DockIcon>
    <DockIcon>
      <i class="pi pi-home !text-black"></i>
    </DockIcon>
    <DockIcon>
      <i class="pi pi-home !text-black"></i>
    </DockIcon>
  </Dock>
</template>

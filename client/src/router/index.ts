import ChatComponent from '@/components/ChatComponent.vue'
import MatchComponent from '@/components/MatchComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MatchComponent,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatComponent,
    },
  ],
})

export default router

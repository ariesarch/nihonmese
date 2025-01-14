<template>
  <div class="flex flex-col h-scree">
      <AppHeader />
      <main 
          :class="[
            'flex flex-1 p-4 transition-all duration-300',
            { 'ml-[250px]': isSidebarOpen, 'ml-0': !isSidebarOpen }
          ]"
        >
        <slot />
      </main>
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue';
import { ref } from 'vue';
</script>
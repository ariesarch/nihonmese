<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="(chapter, index) in chapters" :key="index"
      class="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
      <h3 class="text-lg font-semibold mb-2">{{ chapter.title }}</h3>
      <p class="text-gray-700">{{ chapter.description }}</p>
      <div class="mt-4">
        <AtomsButton variant="solid" size="sm">
          <NuxtLink :to="chapter.path">Read More..</NuxtLink>
        </AtomsButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Chapter } from '@/utils/types';

const props = defineProps<{
  chapters: Chapter[];
}>();
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>

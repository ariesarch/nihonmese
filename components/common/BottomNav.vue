<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
    <div class="flex justify-around items-center h-16">
      <NuxtLink 
        v-for="item in navigationItems" 
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 hover:text-blue-600"
        :class="{ 'text-blue-600': $route.path.startsWith(item.path) }"
      >
        <div class="icon mb-1">
          <svg v-if="item.name === 'Grammar'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <svg v-else-if="item.name === 'Vocabulary'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="item.name === 'Lessons'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <span class="text-xs">{{ item.name }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const navigationItems = [
  { name: 'Grammar', path: '/grammar' },
  { name: 'Vocabulary', path: '/vocabulary' },
  { name: 'Lessons', path: '/lessons' },
]
</script>

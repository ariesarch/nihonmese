<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-1 pb-16 lg:pb-0">
      <slot />
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import AppHeader from '~/components/common/AppHeader.vue'
import BottomNav from '~/components/common/BottomNav.vue'
</script>

<style>
/* Global styles */
html {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* Improved typography */
h1 { @apply text-4xl font-bold mb-6; }
h2 { @apply text-3xl font-semibold mb-4 mt-8; }
h3 { @apply text-2xl font-medium mb-3 mt-6; }
h4 { @apply text-xl font-medium mb-2 mt-4; }
p { @apply mb-4 leading-relaxed; }

/* Improved link styles */
a {
  @apply text-blue-600 hover:text-blue-800 transition-colors;
}

/* Container sizes for different screens */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

body {
  @apply text-gray-800;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
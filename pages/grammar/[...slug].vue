<template>
  <div class="flex min-h-screen">
    <!-- Mobile Sidebar Toggle -->
    <button 
      @click="isSidebarOpen = !isSidebarOpen"
      class="fixed bottom-20 right-4 z-50 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>

    <!-- Sidebar Backdrop -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside 
      class="fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-72 bg-white border-r transform transition-transform duration-300 z-40 overflow-hidden"
      :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    >
      <div class="h-full flex flex-col bg-white">
        <div class="p-4 border-b">
          <h2 class="font-semibold text-gray-800">Table of Contents</h2>
        </div>
        <nav class="flex-1 overflow-y-auto p-4">
          <ul class="space-y-1">
            <li v-for="heading in toc" :key="heading.id">
              <a 
                :href="'#' + heading.id"
                class="block py-2 px-3 rounded hover:bg-gray-100 text-sm"
                :class="[
                  'pl-' + (heading.depth * 4),
                  { 'text-blue-600 font-medium': currentSection === heading.id }
                ]"
                @click="isSidebarOpen = false"
              >
                {{ heading.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-w-0">
      <div class="container max-w-3xl mx-auto px-4 py-8">
        <article v-if="page" class="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8">
          <h1 class="text-3xl font-bold mb-8">{{ page.title }}</h1>
          <ContentRenderer :value="page" />
        </article>
        
        <div v-else class="text-center py-16">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Content Not Found</h2>
          <p class="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return Home
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const { path } = route
const page = await queryContent(path).findOne()

const isSidebarOpen = ref(false)
const currentSection = ref('')

// Get table of contents
const toc = computed(() => {
  if (!page?.body?.toc?.links) return []
  return page.body.toc.links
})

// Track current section
const updateCurrentSection = () => {
  const headings = document.querySelectorAll('h2, h3, h4')
  for (const heading of headings) {
    const rect = heading.getBoundingClientRect()
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      currentSection.value = heading.id
      return
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', updateCurrentSection)
  updateCurrentSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurrentSection)
})
</script>

<style>
.prose {
  @apply max-w-none;
}

/* Base typography */
.prose h1, .prose h2, .prose h3, .prose h4 {
  @apply scroll-mt-20;
}

.prose h2 {
  @apply text-2xl font-semibold mt-8 mb-4 text-gray-900 border-b pb-2;
}

.prose h3 {
  @apply text-xl font-semibold mt-6 mb-3 text-gray-800;
}

/* Japanese text styling */
.jp {
  @apply text-blue-700 font-medium;
}

.romaji {
  @apply text-purple-600 italic;
}

.meaning {
  @apply text-green-600 font-medium;
}

.particle {
  @apply text-red-500 font-bold;
}

/* Example boxes */
.example-box {
  @apply bg-gray-50 rounded-lg p-4 my-4 border border-gray-200;
}

.example-box .jp {
  @apply text-lg mb-2 block;
}

.example-box .romaji {
  @apply text-sm mb-1 block;
}

.example-box .meaning {
  @apply text-base block;
}

/* Grammar points */
.grammar-point {
  @apply bg-blue-50 border-l-4 border-blue-500 p-4 my-4;
}

/* Notes */
.note {
  @apply bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4 text-sm;
}

/* Practice section */
.practice {
  @apply bg-green-50 rounded-lg p-6 my-6;
}

.practice h4 {
  @apply text-lg font-semibold text-green-800 mb-4;
}

/* Tables */
.prose table {
  @apply w-full border-collapse my-6;
}

.prose th {
  @apply bg-gray-50 px-4 py-2 text-left font-semibold border border-gray-200;
}

.prose td {
  @apply px-4 py-2 border border-gray-200;
}

/* Other elements */
.prose p {
  @apply text-gray-700 leading-relaxed mb-4;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose li {
  @apply mb-2;
}

.prose code {
  @apply bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono;
}

.prose pre {
  @apply bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.prose img {
  @apply rounded-lg shadow-sm my-4 max-w-full mx-auto;
}

/* Hide scrollbar but keep functionality */
.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
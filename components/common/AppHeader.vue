<template>
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-bold text-blue-600">Nihonmese</span>
          </NuxtLink>
        </div>

        <!-- Global Search -->
        <div class="flex-1 max-w-2xl relative">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search documentation... (Press '/' to focus)"
              class="w-full px-4 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ref="searchInput"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Search Results -->
          <div
            v-if="showSearchResults && searchResults.length > 0"
            class="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50"
          >
            <ul class="py-2">
              <li
                v-for="result in searchResults"
                :key="result._path"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                @click="navigateToResult(result._path)"
              >
                <div class="font-medium text-gray-900">{{ result.title }}</div>
                <div class="text-sm text-gray-600 line-clamp-1">{{ result.description }}</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path.startsWith(item.path) }"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const showSearchResults = ref(false)
const searchResults = ref([])
const searchInput = ref(null)

const navigationItems = [
  { name: 'Grammar', path: '/grammar' },
  { name: 'Vocabulary', path: '/vocabulary' },
  { name: 'Lessons', path: '/lessons' },
]

// Debounced search function
const debouncedSearch = useDebounceFn(async () => {
  if (!searchQuery.value?.trim()) {
    searchResults.value = []
    showSearchResults.value = false
    return
  }

  try {
    const query = searchQuery.value.toLowerCase().trim()
    const results = await queryContent()
      .where({
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { body: { $contains: query } }
        ]
      })
      .find()

    searchResults.value = results
    showSearchResults.value = true
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
    showSearchResults.value = false
  }
}, 300)

// Watch for search query changes
watch(searchQuery, () => {
  debouncedSearch()
})

// Navigate to search result
const navigateToResult = (path) => {
  router.push(path)
  searchQuery.value = ''
  showSearchResults.value = false
}

// Keyboard shortcuts
const handleKeydown = (e) => {
  // Press '/' to focus search
  if (e.key === '/' && document.activeElement !== searchInput.value) {
    e.preventDefault()
    searchInput.value?.focus()
  }
  // Press 'Escape' to close search results
  if (e.key === 'Escape') {
    showSearchResults.value = false
    searchInput.value?.blur()
  }
}

// Close search results when clicking outside
const closeSearchResults = (e) => {
  if (!e.target.closest('.search-container')) {
    showSearchResults.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', closeSearchResults)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', closeSearchResults)
})
</script>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}

/* Truncate long text in search results */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

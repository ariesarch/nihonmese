<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref('');

// Reset page when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

const query = computed(() => ({
  path: '/grammar',
  where: searchQuery.value ? {
    $or: [
      { title: { $regex: searchQuery.value } },
      { description: { $regex: searchQuery.value } },
      { date: { $regex: searchQuery.value } },
      { layout: { $regex: searchQuery.value } }
    ]
  } : undefined,
  sort: [{ date: -1 }],
  limit: itemsPerPage,
  skip: (currentPage.value - 1) * itemsPerPage,
}));

// Query to get total count with search
const countQuery = computed(() => ({
  path: '/grammar',
  where: searchQuery.value ? {
    $or: [
      { title: { $regex: searchQuery.value } },
      { description: { $regex: searchQuery.value } },
      { date: { $regex: searchQuery.value } },
      { layout: { $regex: searchQuery.value } }
    ]
  } : undefined,
  sort: [{ date: -1 }],
}));

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8 text-center">Japanese Grammar</h1>
    
    <!-- Search Input -->
    <div class="mb-8 max-w-md mx-auto w-full">
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="search"
          placeholder="Search by title, description, date, or layout..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span class="absolute right-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>
      <!-- Search info -->
      <div class="text-sm text-gray-500 mt-1">
        Search in: Title, Description, Date (YYYY-MM-DD), Layout (Case-sensitive)
      </div>
    </div>

    <ContentList :query="query">
      <template #default="{ list }">
        <!-- Grid layout for items -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div v-for="article in list" :key="article._path" class="card">
            <NuxtLink :to="article._path" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
              <p class="text-gray-600 mb-2">{{ article.description }}</p>
              <div class="text-sm text-gray-500">
                <div>Date: {{ article.date }}</div>
                <div>Layout: {{ article.layout }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Get total count for pagination -->
        <ContentList :query="countQuery">
          <template #default="{ list: allItems }">
            <!-- Pagination -->
            <div v-if="allItems.length > 0" class="mt-8 flex justify-center">
              <nav class="flex items-center gap-2">
                <button 
                  @click="goToPage(currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                
                <!-- Page numbers -->
                <div class="flex gap-1">
                  <button 
                    v-for="page in Math.ceil(allItems.length / itemsPerPage)" 
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-1 rounded border',
                      currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <button 
                  @click="goToPage(currentPage + 1)" 
                  :disabled="currentPage >= Math.ceil(allItems.length / itemsPerPage)"
                  class="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </template>
          <template #not-found>
            <div class="text-center text-gray-500 my-8">
              No items found
            </div>
          </template>
        </ContentList>
      </template>
      <template #not-found>
        <div class="text-center text-gray-500 my-8">
          No results found for "{{ searchQuery }}"
        </div>
      </template>
    </ContentList>
  </div>
</template>

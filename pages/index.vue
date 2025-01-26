<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Learn Japanese</h1>
    
    <ContentList v-slot="{ list }" :query="query">
      <!-- Grid layout for items -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="article in list" :key="article._path" class="card">
          <NuxtLink :to="article._path" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
            <p class="text-gray-600">{{ article.description }}</p>
          </NuxtLink>
        </div>
      </div>

      <!-- Get total count for pagination -->
      <ContentList :query="countQuery" v-slot="{ list: allItems }">
        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
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
      </ContentList>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 5;

const query = computed(() => ({
  path: '/grammar',
  sort: [{ date: -1 }],
  limit: itemsPerPage,
  skip: (currentPage.value - 1) * itemsPerPage,
}));

// Query to get total count
const countQuery = computed(() => ({
  path: '/grammar',
  sort: [{ date: -1 }],
}));

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 5;

// Dummy total items count; replace this with a dynamic value
const totalItems = ref(20); // Example: replace with a real count fetched from an API or query

// Update query dynamically based on the current page
const query = computed(() => ({
  path: '/grammar', // Path to the folder containing Markdown files
  where: { layout: 'grammar' }, // Optional: Filter by layout
  sort: [{ date: -1 }], // Sort by date in descending order
  limit: itemsPerPage,
  skip: (currentPage.value - 1) * itemsPerPage, // Skip items for pagination
}));

// Method to change page
const goToPage = (page: number) => {
  if (page >= 1 && page <= Math.ceil(totalItems.value / itemsPerPage)) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Content Section -->
    <ContentList :query="query" v-slot="{ list, loading, error }">
      <!-- Handle Loading State -->
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <!-- Handle Error State -->
      <div v-else-if="error" class="text-red-500">Error: {{ error.message }}</div>
      <!-- Display Content -->
      <div v-else>
        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="item in list"
            :key="item._path"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <nuxt-link  :to="item._path" class="cursor-pointer">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ item.title }}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              {{ item.description }}
            </p>
            <nuxt-link :to="item._path" class="text-blue-500 hover:underline">
              Read more
            </nuxt-link>
            </nuxt-link>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center mt-4 space-x-2">
          <button
            class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Previous {{itemsPerPage}}
          </button>
          <button
            v-for="page in Math.ceil(totalItems / itemsPerPage)"
            :key="page"
            class="px-3 py-1 rounded"
            :class="{
              'bg-blue-500 text-white': page === currentPage,
              'bg-gray-200 text-gray-600 hover:bg-gray-300': page !== currentPage,
            }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="currentPage * itemsPerPage >= totalItems"
            @click="goToPage(currentPage + 1)"
          >
            Next{{totalItems}}
          </button>
        </div>
      </div>
    </ContentList>
  </div>
</template>

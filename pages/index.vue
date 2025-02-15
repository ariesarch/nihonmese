<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Learn Japanese</h1>
    
    <ContentList v-slot="{ list }" :query="query">
      <MoleculesArticleList>
        <AtomsCard v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path">
            <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
            <p class="text-gray-600">{{ article.description }}</p>
          </NuxtLink>
        </AtomsCard>
      </MoleculesArticleList>

      <ContentList :query="countQuery" v-slot="{ list: allItems }">
        <MoleculesPagination 
          :currentPage="currentPage"
          :totalPages="Math.ceil(allItems.length / itemsPerPage)"
          @page-change="goToPage"
        />
      </ContentList>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 6;

const query = computed(() => ({
  path: '/grammar',
  sort: [{ __id: 1 }],
  limit: itemsPerPage,
  skip: (currentPage.value - 1) * itemsPerPage,
}));

// Query to get total count
const countQuery = computed(() => ({
  path: '/grammar',
  sort: [{ __id: 1 }],
}));

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>

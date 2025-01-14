<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch vocabularies.json from the server
const { data:vocabularies, error } = await useFetch('/api/vocabularies');
// Create search filters for both Japanese and Burmese
const japaneseSearch = ref('');
const burmeseSearch = ref('');

// Computed property to filter the vocabularies based on search terms
const filteredVocabularies = computed(() => {
  if (!vocabularies) return [];
  const japaneseKeyword = japaneseSearch.value;
  const burmeseKeyword = burmeseSearch.value;
  if (!japaneseKeyword && !burmeseKeyword) {
    return vocabularies;
  }
  return vocabularies.filter((item: any) => {
    const matchesJapanese = item.japanese.toLowerCase().includes(japaneseKeyword.toLowerCase());
    const matchesBurmese = item.burmese.toLowerCase().includes(burmeseKeyword.toLowerCase());
    return matchesJapanese && matchesBurmese;
  });
});
</script>

<template>
  <div class="mx-auto flex flex-col justify-center items-center">
    <h1 class="my-4 font-bold text-gray-500 text-3xl"><b>{{vocabularies.length}}</b> Vocabularies</h1>
    
    <!-- Search Inputs for Japanese and Burmese -->
    <div class="flex gap-2">
      <input 
        v-model="burmeseSearch" 
        type="text" 
        placeholder="Search Burmese"
        class="border p-2 mb-4"
        autofocus
      />
      <input 
        v-model="japaneseSearch" 
        type="text" 
        placeholder="Search Japanese"
        class="border p-2 mb-4"
      />
    </div>
    
    <!-- Error or Loading States -->
    <div v-if="error">Error loading vocabularies.</div>
    <div v-else-if="!vocabularies">Loading...</div>
    <div v-else>
      <!-- Pass filtered vocabularies to the DoubleList component -->
      <OrganismsVocabularyList :items="filteredVocabularies.value" />
    </div>
  </div>
</template>

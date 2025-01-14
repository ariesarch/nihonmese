<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch sentences.json from the server
const { data:sentences, error } = await useFetch('/api/sentences');
</script>

<template>
  <div class="mx-auto flex flex-col justify-center items-center">
    <h1 class="my-4 text-gray-500 text-3xl font-extrabold"><b>{{sentences.length}}</b> Sentences</h1>  
    <!-- Error or Loading States -->
    <div v-if="error">Error loading sentences.</div>
    <div v-else-if="!sentences">Loading...</div>
    <div v-else>
      <!-- Pass filtered sentences to the DoubleList component -->
      <OrganismsSentenceList :items="sentences" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch grammers.json from the server
const { data:grammers, error } = await useFetch('/api/grammers');
// console.log(grammers)
</script>

<template>
  <div class="mx-auto flex flex-col justify-center items-center">
    <h1 class="my-4 text-gray-500 text-3xl font-extrabold"><b>{{grammers.length}}</b> Grammar</h1>  
    <!-- Error or Loading States -->
    <div v-if="error">Error loading grammars.</div>
    <div v-else-if="!grammers">Loading...</div>
    <div v-else>
      <!-- Pass filtered grammars to the DoubleList component -->
      <OrganismsGrammarList :items="grammers" />
    </div>
  </div>
</template>
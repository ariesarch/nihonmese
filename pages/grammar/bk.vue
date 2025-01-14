<script setup lang="ts">
import { ref, computed } from 'vue';

// Fetch grammars.json from the server
const { data: grammars, error } = await useFetch('/api/grammars');
</script>

<template>
  <div v-if="error">Error loading grammars.</div>
  <div v-else-if="!grammars">Loading...</div>
  <div v-else>
    <!-- Sidebar -->
      <CommonSideBar 
        :items="grammars" 
        valueKey="pattern" 
        detail="detail"
      />
    <!-- Content Section -->
      <h1 class="my-4 text-gray-500 text-3xl font-extrabold"><b>{{ grammars.length }}</b> Grammar</h1>  
      <OrganismsGrammarList :items="grammars" />
  </div>
</template>


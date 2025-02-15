<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { ref, computed } from 'vue';
import {IVocab} from '~/interfaces/IVocab'
// Fetch vocabularies.json from the server
const { data: vocabularies, error } = await useFetch<IVocab[]>('/api/vocabularies');
</script>

<template>
  <div class="mx-auto flex flex-col justify-center items-center">
    <h1 class="my-4 text-gray-500 text-3xl font-extrabold"><b>{{ vocabularies?.length }}</b> vocabularies</h1>
    <!-- Error or Loading States -->
    <div v-if="error">Error loading vocabularies.</div>
    <div v-else-if="!vocabularies">Loading...</div>
    <div v-else>
      <!-- Pass filtered vocabularies to the DoubleList component -->
      <!-- <OrganismsSentenceList :items="vocabularies" /> -->
    </div>
  </div>
</template>
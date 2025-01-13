<script setup lang="ts">
import { defineProps } from 'vue';

// Define the props for the parent component
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section>
    <h2 class="text-gray-400 text-xl font-bold">Grammar List</h2>
    <MoleculesDoubleList :items="items" valueKey1="topic" valueKey2="pattern" />
  </section>
</template>
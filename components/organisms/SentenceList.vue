<script setup lang="ts">

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
    <h2 class="text-gray-400 text-xl font-bold">Sentence List</h2>
    <MoleculesDoubleList :items="items" valueKey1="japanese" valueKey2="burmese" />
  </section>
</template>
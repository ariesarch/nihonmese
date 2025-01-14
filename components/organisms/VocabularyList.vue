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
    <h2 class="text-gray-400 text-3xl font-bold">Vocabulary List</h2>
    <MoleculesTripleList :items="items" valueKey1="japanese" valueKey2="burmese" valueKey3="english" />
  </section>
</template>
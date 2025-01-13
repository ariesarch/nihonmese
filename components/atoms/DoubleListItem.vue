<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
  valueKey1: {
    type: String,
    default: 'name'
  },
  valueKey2: {
    type: String,
    default: 'name'
  },
});
</script>

<template>
  <div class="flex justify-center">
    <p class="text-red-500">{{ item[valueKey1] }}</p>
    =>
    <p class="text-gray-500">{{ item[valueKey2] }}</p>
  </div>
</template>

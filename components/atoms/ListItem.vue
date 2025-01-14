<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
  valueKey: {
    type: String,
    default: 'name',  // Default value key in case no key is provided
  },
});
</script>

<template>
  <div>
    <!-- Use valueKey to display the corresponding value from the item -->
    <p class="text-2xl">{{ item[valueKey] }}</p>
  </div>
</template>

<script setup lang="ts">
import ListItem from '@/components/atoms/ListItem.vue';
import { defineProps } from 'vue';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <ListItem :item="item" />
    </li>
  </ul>
</template>
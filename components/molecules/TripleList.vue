<script setup lang="ts">
import ListItem from '@/components/atoms/ListItem.vue';

// Define the props for the parent component
defineProps({
  items: {
    type: Array,
    required: true,
  },
  valueKey1: {
    type: String,
    default: 'name',
  },
  valueKey2: {
    type: String,
    default: 'name',
  },
  valueKey3: {
    type: String,
    default: 'name',
  },
});
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <div class="flex justify-between text-2xl leading-10 tracking-wide">
        <!-- Pass 'japanese' and 'english' as the valueKey props -->
        <ListItem :item="item" :valueKey="valueKey1" class="text-red-500"/>
        <!-- <div class="block">=></div> -->
        <ListItem :item="item" :valueKey="valueKey2"/>
        <!-- <ListItem :item="item" :valueKey="valueKey3"/> -->
      </div>
    </li>
  </ul>
</template>
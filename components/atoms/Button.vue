<template>
  <button :class="[
    'rounded',
    variant === 'outline' ? 'bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-100 hover:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600',
    sizeClasses[size]
  ]" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  variant: 'solid' | 'outline';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
}>();

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
  xl: 'px-6 py-3 text-xl',
};
</script>

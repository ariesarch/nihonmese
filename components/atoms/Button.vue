<template>
  <button :class="[
    'rounded',
    variant === 'outline' ? 'bg-transparent border border-primary-500 text-gray-500 hover:bg-primary-500 hover:text-white' : 'bg-primary-500 text-white hover:bg-primary-500',
    sizeClasses[size]
  ]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

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
const emit = defineEmits<{
  (event: 'click'): void;
}>();
const handleClick = (event: MouseEvent) => {
  event.stopPropagation(); // Prevent the event from bubbling up to the parent
  emit('click'); // Emit the click event to the parent
};
</script>

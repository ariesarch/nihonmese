<template>
    <button class="px-6 py-3 bg-blue-600 text-white rounded-md cursor-pointer" @click="$emit('trigger')">
        <slot />
    </button>
</template>

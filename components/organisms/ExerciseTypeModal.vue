<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full" @click.stop>
            <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
            <p class="mb-4">{{ message }}</p>
            <div class="flex justify-end space-x-4">
                <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" @click="closeModal">
                    Cancel
                </button>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md" @click="confirmAction">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const emit = defineEmits();

const isVisible = ref(false);

const openModal = () => {
    isVisible.value = true;
};

const closeModal = () => {
    isVisible.value = false;
};

const confirmAction = () => {
    emit('confirm');
    closeModal();
};

// Expose modal methods for external control using defineExpose
defineExpose({
    openModal,
    closeModal,
});
</script>

<style scoped>
/* Optional: You can add custom modal styling here if needed */
</style>

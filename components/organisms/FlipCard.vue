<template>
    <div class="relative h-96 w-full rounded-lg shadow-md my-1">
        <div class="flip-card w-full h-full" :class="{ 'rotate-x-180': flipped }">
            <div @click="flipCard" class="flip-card-front w-full h-full absolute flex items-center justify-center">
                <h4 class="my-auto text-2xl font-bold text-primary-500">Front--</h4>
            </div>

            <div @click="flipCard"
                class="flip-card-back w-full h-full absolute flex items-center justify-center rotate-x-180">
                <h4 class="my-auto text-2xl font-bold text-green-700">Back--</h4>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const flipped = ref(false);

const flipCard = () => {
    flipped.value = !flipped.value;
};
</script>

<style scoped>
.flip-card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-card-front,
.flip-card-back {
    backface-visibility: hidden;
}

.rotate-x-180 {
    transform: rotateX(180deg);
}
</style>

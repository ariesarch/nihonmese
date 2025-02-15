<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Vocabulary Lessons</h1>
        <ul>
            <li v-for="lesson in lessons" :key="lesson._id" @click="goToVocabulary(lesson._id)"
                class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <h2 class="text-xl font-semibold mb-2">{{ lesson.title }}</h2>
                <p class="text-gray-600">{{ lesson.description }}</p>
            </li>
        </ul>
        <div class="flex justify-center mt-8">
            <button @click="fetchLessons(currentPage - 1)" :disabled="currentPage === 1"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous</button>
            <span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="fetchLessons(currentPage + 1)" :disabled="currentPage === totalPages"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {
        const lessons = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(1);

        const fetchLessons = async (page) => {
            if (page < 1) return;

            try {
                // const response = await axios.get(`/lessons?page=${page}`);
                const response = await axios.get(`http://localhost:3000/api/lessons?page=${page}`);
                console.log(response.data);
                lessons.value = response.data.lessons;
                totalPages.value = response.data.totalPages;
                currentPage.value = page;
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        const goToVocabulary = (lessonId) => {
            // Implement navigation to vocabulary detail page
            // For example: this.$router.push(`/vocabulary/${lessonId}`);
        };

        fetchLessons(currentPage.value);

        return { lessons, currentPage, totalPages, fetchLessons, goToVocabulary };
    },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>

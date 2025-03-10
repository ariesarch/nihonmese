<template>
    <div class="flex flex-col">
        <!-- Toggle Button -->
        <div class="flex justify-center items-center">
            <div class="w-1/3 font-thin flex">
                ---------------------------------------------
            </div>
            <button class="flex justify-center items-center w-1/3 px-2 py-3 text-primary-600 bg-primary-50 rounded-full"
                @click="toggleAccordion">
                <div>{{ isVisible ? 'Practicing' : 'Practice ' }}</div>
                <div class="inline">
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                                fill="rgb(219 39 119)"></path>
                        </g>
                    </svg>
                </div>
            </button>
            <div class="w-1/3 font-thin flex">
                -------------------------------------------
            </div>
        </div>
        <!-- Accordion Content -->
        <div v-show="isVisible" class="transition-all mt-4 bg-white p-6 rounded-lg shadow-lg max-w-full">
            <form class="max-w-sm mx-auto" v-if="!selectedType">
                <select v-model="selectedLang" id="countries"
                    class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="en">English</option>
                    <option value="mm">Myanmar</option>
                </select>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                    option</label>
                <select v-model="selectedType" id="countries"
                    class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option :value="type" v-for="(type,index) in lesson?.types" :key="index">{{type}}</option>
                </select>
            </form>
            <OrganismsQuizMultiple v-if="selectedType =='multi'" :lesson="lesson" :selectedLang="selectedLang" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
import {generateMultipleChoiceQuiz} from '@/utils/createQuiz'
const props = defineProps<{
    config: {
        chapter_id: string;
        lesson_id: string;
    }
}>();
interface Lesson {
    chapter_id: string;
    lesson_id: Object;
    types: string[];
}
const typeMultiple = ref<Object | null>(null);
const selectedType = ref(null);
const selectedLang = ref('mm');
const isVisible = ref(false);
const lesson = ref<Lesson | null>(null); 
const toggleAccordion = async () => {
    if(lesson.value ==null) {
        const fetchedLesson = await $fetch(`/api/lesson_content?chapter_id=${props.config.chapter_id}&lesson_id=${props.config.lesson_id}`);
        lesson.value = fetchedLesson as Lesson;
    }
    isVisible.value = !isVisible.value;
};
watch(selectedType, async (newType, oldType) => {
    if(newType != oldType) {
        // if(newType == 'multi') {
        //     const content = await generateMultipleChoiceQuiz(lesson.value);
        //     typeMultiple.value = content;
        // }
    }
})
</script>
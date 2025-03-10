<template>
    <div class="w-full bg-transparent">
        <h6 class="text-center font-bold">Choose the correct definition for each
            {{isNormalDir ? 'Japanese' : selectedLang == 'en' ? 'English' :'Myanmar'}} expression.</h6>
        <div v-if="currentQuestionIndex == 0 || currentQuestionIndex == quizData.length"
            class="flex justify-center items-center space-x-6">
            <!-- Displaying the current languages -->
            <div class="flex items-center space-x-2">
                <span class="text-xl font-semibold">{{ isNormalDir ? 'Japanese' : selectedLang =='en'? 'English':
                    'Myanmar' }}</span>
            </div>

            <!-- Bi-Directional Arrow -->
            <div class="text-3xl cursor-pointer">
                <span @click="toggleSourceLang">🔄</span> <!-- This is the bi-directional arrow -->
            </div>

            <!-- Display the language on the other side -->
            <div class="flex items-center space-x-2">
                <span class="text-xl font-semibold">{{ isNormalDir ? selectedLang =='en'? 'English': 'Myanmar' :
                    'Japanese' }}</span>
            </div>
        </div>
        <!-- Display the current question -->
        <div v-if="!quizFinished && currentQuestionIndex < quizData.length" class="mb-4">
            <h3 class="font-extrabold text-center">{{ quizData[currentQuestionIndex].question }}</h3>
            <div class="flex-wrap flex flex-col sm:flex-row gap-2 justify-center">
                <div v-for="(answer, answerIndex) in quizData[currentQuestionIndex].answers" :key="answerIndex"
                    class="mb-2">
                    <div class="flex gap-1 items-center">
                        <div>
                            {{ String.fromCharCode(65 + answerIndex) }}:
                        </div>
                        <AtomsButton variant="outline" size="lg" class="w-full"
                            @click="checkAnswer(answer, quizData[currentQuestionIndex])">
                            {{ answer.content }}
                        </AtomsButton>
                    </div>
                </div>
            </div>
        </div>
        <!-- Optional: Display the result -->
        <div v-else>
            <h3 class="text-center">Your score: {{ score }} / {{ quizData.length }}</h3>
            <div v-for="(questionData, index) in quizData" :key="index" class="mb-4">
                <h3 class="text-start">{{questionData.question }}</h3>
                <div class="flex-wrap flex flex-col sm:flex-row gap-2 justify-start border-b pb-4">
                    <div v-for="(answer, answerIndex) in questionData.answers" :key="answerIndex" class="mb-2">
                        <div class="flex gap-1 items-center">
                            <div>
                                {{ String.fromCharCode(65 + answerIndex) }}:
                            </div>
                            <AtomsButton variant="outline" size="sm"
                                :class="{ 'border-1 border-success text-success': answer.isAnswer, 'text-red-500': answer.isIncorrect }"
                                @click="speakText(answer.content)">
                                <span class="mr-1">{{ answer.status }}</span>
                                {{ answer.content }}
                            </AtomsButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watchEffect } from 'vue';

const props = defineProps<{
    lesson: Lesson;
    selectedLang: string;
}>();
type Answer = {
    isAnswer: boolean;
    content: string;
};
interface QuizletValue {
    en: string;
    mm: string;
}
interface Lesson {
    format: string;
    quizlet: { [key: string]: any };
}
const isNormalDir = ref(true);
const quizData = ref<{ [key: string]: any }>({});
const score = ref(0);
const quizFinished = ref(false);
const currentQuestionIndex = ref(0);
const toggleSourceLang = () => {
    isNormalDir.value = !isNormalDir.value
    currentQuestionIndex.value =0;
    quizFinished.value = false;
    score.value =0;
    generateMultipleChoiceQuiz(props.lesson)
}
const generateMultipleChoiceQuiz = async (lesson: Lesson) => {
    // convert the quizlet to the selected type
    if (/vocab|kana|numbers|kanji/.test(lesson.format)) {
        // multi-choice conversion
        // var quizlet = []
        let quizlet: { question: string; answers: Answer[] }[] = [];
        let preparedQuiz: { [key: string]: any } = [];
        var keys: string[] = [];
        let keys2: string[] =  [];
        var currentAnswer, sentence, answer, answers, def, i, j, k, n, n2;

        // get keys for randomization of the vocabulary
        // for (i in lesson.quizlet) {
        //     console.log(i)
        //     keys.push(i);
        //     keys2.push(i);
        // }
        // Object.values(lesson.quizlet).forEach((data:any)=>{
        //     keys.push(data.en as string);
        //     keys2.push(data.en as string);
        // })
        for (const [key, value] of Object.entries(lesson.quizlet)) {
            console.log(`${key}: ${JSON.stringify(value)}`);
            
            if (isNormalDir.value) {
                keys.push(key);
                keys2.push(key);
                console.log("Value:", value)
                preparedQuiz[key] = value[props.selectedLang];
            }else{
                keys.push(value[props.selectedLang]);
                keys2.push(value[props.selectedLang]);
                preparedQuiz[value[props.selectedLang]] = key
            }
        }
        // if(!isNormalDir) {
        //     lesson.quizlet = Object.fromEntries(
        //         Object.entries(lesson.quizlet).map(([key, value]) => [value, key])
        //     );
        // }
        console.log("quizlet", preparedQuiz)

        // randomly sort the vocab
        for (i = 0, j = keys.length; i < j; i++) {
            n = Math.floor(Math.random() * keys.length);
            def = keys[n].split('|');
            currentAnswer = preparedQuiz[keys[n]].replace(/\|.*?$/, '');
            sentence = /\|/.test(preparedQuiz[keys[n]]) ? preparedQuiz[keys[n]].replace(/.*?\|(.*?$)/, '$1') : '';
            // push the question data
            quizlet.push({
                question: def[0] + (def[1] ? def[1] : ''),
                // answers:[]
                answers: [{isAnswer:true,content: currentAnswer}]
            });

            // randomly assign answers
            answers = keys2.slice();
            answers.splice(n, 1);
            k = 3;

            while (k-- > 0) {
                if (answers.length) {
                    n2 = Math.floor(Math.random() * answers.length);
                    answer = preparedQuiz[answers[n2]].replace(/\|.*?$/, '');

                    // prevent identical answers from showing
                    if (answer == currentAnswer) {
                        k++; // increment to try another
                    }
                    // otherwise add a new answer if it's not identical
                    else {
                        quizlet[i].answers.push(answer == currentAnswer ? {isAnswer:false,content:'!' + answer} : {isAnswer:false,content:answer});
                    }

                    answers.splice(n2, 1);
                } else {
                    break; // break out if there's no more answers, to prevent errors
                }
            }

            // remove the key
            keys.splice(n, 1);
            shuffle(quizlet[i].answers);

        }
        // lesson.quizlet = quizlet;
        return quizlet;
    }
    console.log(lesson.quizlet)
    return lesson.quizlet;
}
const shuffle = (array: Answer[]) =>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const checkAnswer = (selectedAnswer: any, questionData: any) => {
    const correctAnswer = questionData.answers.find((answer: any) => answer.isAnswer); // Check for correct answer (A+)
    // selectedAnswer.isSelected = true;
    if (selectedAnswer === correctAnswer) {
        score.value++;
        selectedAnswer.status = '✅';
    }else{
        selectedAnswer.status = '😔';
        selectedAnswer.isIncorrect = true;
    }
    nextQuestion();
};
const nextQuestion = () => {
    currentQuestionIndex.value++;
    if (currentQuestionIndex.value === quizData.value.length) {
        quizFinished.value = true;
    }
    console.log(currentQuestionIndex.value)
}
watchEffect(async () => {
    if (props.lesson) {
        quizData.value = await generateMultipleChoiceQuiz(props.lesson);
        console.log(quizData.value)
    }
});
const speakText = (text:string) => {
    // Check if the SpeechSynthesis API is available
    console.log("Speaking..")
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        // utterance.lang = !isNormalDir.value ? 'ja-JP' : (props.selectedLang === 'en' ? 'en-Us' : 'my-MM');
        utterance.lang = 'ja-JP'
        // console.log(utterance.lang)
        utterance.pitch = 1; // Normal pitch
        utterance.rate = 1; // Normal speed
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Speech Synthesis not supported in this browser.');
    }
};
</script>
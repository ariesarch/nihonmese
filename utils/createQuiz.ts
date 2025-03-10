var Genki = {

    // exercise statistics
    stats: {
        problems: 0, // number of problems to solve in the lesson
        solved: 0, // number of problems solved
        mistakes: 0, // number of mistakes made in the lesson
        score: 0, // the student's score
        exclude: 0  // answers to exclude, mostly for text-only segments in multi-choice quizzes
    },
    // frequently used/generic strings
    lang: {
        std_drag: 'Drag the English expression to the Japanese expression that has the same meaning.<br>TIP: Click an expression to mark it, then click an empty field to drop the answer there.',
        std_kana: 'Drag the Kana to the matching Romaji.<br>TIP: Click the kana to mark it, then click an empty field to drop the answer there.',
        std_num: 'Drag the Numbers to the matching Kana.<br>TIP: Click a number to mark it, then click an empty field to drop the answer there.',
        std_multi: 'Solve the problems by choosing the correct answers.',
        std_questions: 'Answer the questions as best as you can.',
        std_culture: 'Answer the questions about Japanese culture as best as you can.',
        std_stroke_order: 'Practice drawing each kanji by following the stroke order.',
        std_drawing: 'Practice drawing the following kanji multiple times.',

        // additional vocab info
        vocab_multi: 'Choose the correct definition for each Japanese expression.',
        vocab_writing: 'Practice spelling the following words/expressions.',
        vocab_fill: 'Write the Japanese definition for the following words/expressions.',

        // additional kana info
        kana_multi: 'Choose the correct Romaji for the %{KANA}.',
        kana_writing: 'Practice writing the following %{KANA}.',
        kana_fill: 'Complete the chart by filling in the Romaji.',

        // addition number info
        num_multi: 'Read the Japanese and choose the correct numbers.',
        num_writing: 'Practice spelling the following numbers.',
        num_fill: 'Write the following numbers in Japanese (hiragana).',

        kanji_readings_multi: 'Choose the correct readings for each kanji.',
        kanji_readings_drag: 'Match each kanji with their readings.',
        kanji_yomikata: '</div><p class="text-block" style="margin:10px 0;">▶ indicates the <em>on-yomi</em> (pronunciation originally borrowed from Chinese).<br>▷ indicates the <em>kun-yomi</em> (native Japanese reading).</p>',

        kanji_meanings_multi: 'Choose the correct meanings for each kanji.',
        kanji_meanings_drag: 'Match each kanji with their meanings.',

        // options for exercise variations
        opts: {
            kana: {
                kana: 'Drag and Drop',
                multi: 'Multiple Choice',
                writing: 'Writing Practice',
                fill: 'Fill in the Chart'
            },

            numbers: {
                drag: 'Drag and Drop',
                multi: 'Multiple Choice',
                writing: 'Spelling Practice',
                fill: 'Write the Numbers'
            },

            kanji: {
                multi: 'Multiple Choice',
                drag: 'Drag and Drop'
            },

            vocab: {
                drag: 'Drag and Drop',
                multi: 'Multiple Choice',
                writing: 'Spelling Practice',
                fill: 'Write the Definition'
            },

            practice: {
                multi: 'Multiple Choice',
                fill: 'Written',
                drag: 'Drag and Drop'
            },

            hirakata: {
                fill: 'Written',
                stroke: 'Stroke Order Practice',
                drawing: 'Drawing Practice'
            }
        },

        mistakes: 'The items outlined in <span class="t-red t-bold">red</span> were answered wrong before finding the correct answer. Review these problems before trying again.',
        writing_mistakes: 'The items outlined in <span class="t-red t-bold">red</span> were answered wrong. Review these problems before trying again.',
        multi_mistakes: 'The answers you selected that were wrong are outlined in <span class="t-red t-bold">red</span>. The correct answers are outlined in <span class="t-blue t-bold">blue</span>. Review these problems before trying again.',
        stroke_mistakes: 'The characters you drew that were wrong are outlined in <span class="t-red t-bold">red</span>. Please review the stroke order and number of strokes for these characters before trying again.<br><br><b>Note:</b> Sometimes answers may be marked wrong by mistake, due to a mismatch in the recognition algorithm.<br>Please use your own discretion if this occurs.',
        fill_mistakes: 'The items underlined in <span class="t-red t-bold">red</span> were answered wrong, the correct answers are listed underneath in <span class="t-green t-bold">green</span>. Review these problems before trying again.',
        sub_answers: '<b>Note:</b> Answers inside <span class="t-blue t-bold">blue</span> parentheses separated by "<span class="alt-phrase-sep">/</span>" are a list of possible sub-answers; only one can be used.<br>For example.. <span class="t-green"><span class="alt-phrase">(</span>あの<span class="alt-phrase-sep">/</span>その<span class="alt-phrase">)</span>ねこ</span>: そのねこ or あのねこ <span class="t-green">(good)</span> vs あの/そのねこ <span class="t-red">(bad)</span><br><span class="t-green"><span class="alt-phrase">(</span>この<span class="alt-phrase-sep">/</span><span class="alt-phrase">)</span>ねこ</span> means the sub-answer is optional; it can be left out.',

        // buttons
        // review button for drag/drop exercises
        review: '<div id="review-exercise" class="center clearfix"><button id="review-button" class="button" onclick="Genki.review();"><i class="fa">&#xf02d;</i>Review</button></div>',
        // furigana toggle for vocab exercises
        // check answers button for written exercises
        check_answers: '<div id="check-answers" class="center"><button id="check-answers-button" class="button" onclick="Genki.check.answers();"><i class="fa">&#xf00c;</i>Check Answers</button></div>',
        back_to_dict: '<button class="button" onclick="Genki.reset();"><i class="fa">&#xf021;</i>Back to Dictionary</button>'
    }

};
const processLangString = (inputString: string) => {
    return inputString.replace(/Genki\.lang\.(\w+)/g, (_, match) => {
        const value = getGenkiLangValue(match);
        return value || match;
    });
};

const getGenkiLangValue = (key: string) => {
    return Genki.lang[key as keyof typeof Genki.lang] ?? null; // Returns null if not found
};

const generateMultipleChoiceQuizOld = (lesson: any) => {
    // convert the quizlet to the selected type
    if (/vocab|kana|numbers|kanji/.test(lesson.format)) {
        // multi-choice conversion
        var quizlet = [], keys:string[] = [], keys2 = [], currentAnswer, sentence, answer, answers, def, i, j, k, n, n2;

        // get keys for randomization of the vocabulary
        for (i in lesson.quizlet) {
            keys.push(i);
            keys2.push(i);
        }
        // randomly sort the vocab
        for (i = 0, j = keys.length; i < j; i++) {
            

            n = Math.floor(Math.random() * keys.length);
            def = keys[n].split('|');
            currentAnswer = lesson.quizlet[keys[n]].replace(/\|.*?$/, '');
            sentence = /\|/.test(lesson.quizlet[keys[n]]) ? lesson.quizlet[keys[n]].replace(/.*?\|(.*?$)/, '$1') : '';

            // push the question data
            quizlet.push({
                question: '<div class="multi-vocab">' +
                    (def[1] ? '<ruby>' : lesson.format == 'kanji' ? '<div class="big-kanji">' : '') + def[0] + (def[1] ? '<rt>' + def[1] + '</rt></ruby>' : lesson.format == 'kanji' ? '</div>' : '') +
                    (sentence ? '<hr><div class="multi-vocab-sentence">' + sentence + '</div>' : '') +
                    '</div>',
                answers: ['A' + currentAnswer]
            });

            // randomly assign answers
            answers = keys2.slice();
            answers.splice(n, 1);
            k = 3;

            while (k-- > 0) {
                if (answers.length) {
                    n2 = Math.floor(Math.random() * answers.length);
                    answer = lesson.quizlet[answers[n2]].replace(/\|.*?$/, '');

                    // prevent identical answers from showing
                    if (answer == currentAnswer) {
                        k++; // increment to try another
                    }
                    // otherwise add a new answer if it's not identical
                    else {
                        quizlet[i].answers.push(answer.charAt(0) == 'A' ? '!' + answer : answer);
                    }

                    answers.splice(n2, 1);
                } else {
                    break; // break out if there's no more answers, to prevent errors
                }
            }

            // remove the key
            keys.splice(n, 1);
        }
        lesson.quizlet = quizlet;
    }

    let vocab = /"format":"vocab"/.test(JSON.stringify(lesson));
    let isAnswer = false;
    let option = 65;
    let quizz = lesson.quizlet;
    var iterator = 0;
    let length = Object.keys(quizz).length;
    let quizContent = '<div id="question-list">';
    console.log("Quizlet:", JSON.stringify(lesson.quizlet))

    for (; iterator < length; iterator++) {
        quizContent += '<div id="quiz-q' + iterator + '" class="question-block" data-qid="' + (iterator + 1) + '" style="display:none;"><div class="quiz-multi-question">' + (lesson.questionsAlignLeft ? '<div class="quiz-question-inner-text">' : '') + (typeof quizz[iterator].question != 'undefined' ? quizz[iterator].question.replace(/\{.*?\}/g, function (match: string) {
            var data = match.slice(1, match.length - 1).split('|');

        }) : '<div class="text-passage' + (quizz[iterator]?.vertical ? ' vertical-text' : '') + '" ' + (quizz[iterator]?.text.replace(/<br>/g, '').length < 50 ? 'style="text-align:center;"' : '') + '>' + quizz[iterator].text + '</div>' + (quizz[iterator].helper || '')) + (lesson.questionsAlignLeft ? '</div>' : '') + '</div>' + (vocab ? '<button class="button vocab-spoiler-toggle" onclick="Genki.toggle.vocabSpoiler(this);"><i class="fa"></i>Show Choices</button><div class="vocab-spoiler">' : '');
        // add answers to the question block
        while (quizz[iterator].answers.length) {
            n = Math.floor(Math.random() * quizz[iterator].answers.length);

            // answers that begin with "A" are the correct answer. 'ATrue';
            // "!" is for answers that begin with "A", but aren't correct. '!Aomori Nebuta Festival'; lit. ! == NOT(correct)
            if (/^A|^\!/.test(quizz[iterator].answers[n])) {

                // marks the option as the correct answer if it begins with "A"
                if (quizz[iterator].answers[n].charAt(0) == 'A') {
                    isAnswer = true;
                }

                quizz[iterator].answers[n] = quizz[iterator].answers[n].slice(1);
            }

            quizContent += '<div class="quiz-multi-row"><div tabindex="0" class="quiz-multi-answer" data-answer="' + isAnswer + '" data-option="' + String.fromCharCode(option++) + '" onclick="Genki.progressQuiz(this);" onkeypress="event.key == \'Enter\' && Genki.progressQuiz(this);"><div class="quiz-answer-inner-text">' + quizz[iterator].answers[n] + '</div></div></div>';
            isAnswer = false;

            quizz[iterator].answers.splice(n, 1);
        }
        quizContent += (vocab ? '</div>' : '') + '</div>'; // ends the question block
        option = 65; 
    }
    
    // console.log("Quizlet:", quizContent)
    return quizContent;
}
const generateMultipleChoiceQuiz = async(lesson: any) => {
    // convert the quizlet to the selected type
    if (/vocab|kana|numbers|kanji/.test(lesson.format)) {
        // multi-choice conversion
        var quizlet = [], keys: string[] = [], keys2 = [], currentAnswer, sentence, answer, answers, def, i, j, k, n, n2;

        // get keys for randomization of the vocabulary
        for (i in lesson.quizlet) {
            keys.push(i);
            keys2.push(i);
        }
        // randomly sort the vocab
        for (i = 0, j = keys.length; i < j; i++) {


            n = Math.floor(Math.random() * keys.length);
            def = keys[n].split('|');
            currentAnswer = lesson.quizlet[keys[n]].replace(/\|.*?$/, '');
            sentence = /\|/.test(lesson.quizlet[keys[n]]) ? lesson.quizlet[keys[n]].replace(/.*?\|(.*?$)/, '$1') : '';

            // push the question data
            quizlet.push({
                question: def[0] + (def[1] ? def[1]  : ''),
                answers: ['A+' + currentAnswer]
            });

            // randomly assign answers
            answers = keys2.slice();
            answers.splice(n, 1);
            k = 3;

            while (k-- > 0) {
                if (answers.length) {
                    n2 = Math.floor(Math.random() * answers.length);
                    answer = lesson.quizlet[answers[n2]].replace(/\|.*?$/, '');

                    // prevent identical answers from showing
                    if (answer == currentAnswer) {
                        k++; // increment to try another
                    }
                    // otherwise add a new answer if it's not identical
                    else {
                        quizlet[i].answers.push(answer.charAt(0) == 'A+' ? '!' + answer : answer);
                    }

                    answers.splice(n2, 1);
                } else {
                    break; // break out if there's no more answers, to prevent errors
                }
            }

            // remove the key
            keys.splice(n, 1);
        }
        lesson.quizlet = quizlet;
    }
    return lesson.quizlet;
}
export {
    generateMultipleChoiceQuiz
}
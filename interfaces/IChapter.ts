export type TvocabId = number;
export type TlangType = string;
export type TdirType = boolean;
export type TisNext = boolean;
export type TvocabType = 'vocabs' | 'additional_vocabs';
export interface Vocabulary {
    vocab_id: TvocabId;
    format: string;
    title: string;
    quizlet: { [key: string]: any };
}
export interface ISpeech {
    audio_start: number,
    audio_end: number,
    speaker: string;
    speech: string;
}

export interface Vocab {
    vocab_audio: string;
    vocab_data: Vocabulary[]
}
export interface IDialogue {
    dialogue_id: number;
    format: string;
    title: string;
    dialogue_audio: string;
    speeches: ISpeech[]
}
export interface IDialogueData {
    dialogue_data: IDialogue[]
}

export interface Chapter {
    chapter_id: string;
    lesson_id: string;
    vocabs: Vocab;
    additional_vocabs: Vocab;
    dialogues: IDialogueData;
    practices: Practices;
}
export type TpracticeId = number;
export interface IContents{
    speaker: string;
    speech: string;
}
export interface IQuizlet{
    target: string;
    contents: IContents[]
} 
export interface IPracticeData {
    practice_id: number;
    format: string;
    title: string;
    practice_audio: string;
    quizlets: string;
}
export interface Practices {
    practice_data: IPracticeData[]
}

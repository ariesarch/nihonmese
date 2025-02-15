import { Document,Types } from 'mongoose';

export interface IVocab extends Document {
    japanese: string;
    romanji: string;
    burmese: string;
    english: string;
    form: string;
}
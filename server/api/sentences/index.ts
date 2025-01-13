// server/api/sentences.ts
import { defineEventHandler } from 'h3';
import sentences from './data.json';

export default defineEventHandler(() => sentences);

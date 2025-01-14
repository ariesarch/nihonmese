// server/api/chapters.ts
import { defineEventHandler } from 'h3';
import chapters from './data.json';

export default defineEventHandler(() => chapters);

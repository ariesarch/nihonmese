// server/api/vocabularies.ts
import { defineEventHandler } from 'h3';
import vocabularies from './data.json';

export default defineEventHandler(() => vocabularies);

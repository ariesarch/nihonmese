// server/api/grammars.ts
import { defineEventHandler } from 'h3';
import grammars from './data.json';

export default defineEventHandler(() => grammars);

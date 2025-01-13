// server/api/grammers.ts
import { defineEventHandler } from 'h3';
import grammers from './data.json';

export default defineEventHandler(() => grammers);

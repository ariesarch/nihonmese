// server/api/thadars.ts
import { defineEventHandler } from 'h3';
import thadars from './data.json';

export default defineEventHandler(() => thadars);

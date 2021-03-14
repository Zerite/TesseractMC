import { promisify } from 'util';
import fs from 'fs';

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
export const readFilePromise = promisify(fs.readFile);
export const existsPromise = promisify(fs.exists);

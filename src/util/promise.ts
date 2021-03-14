import { promisify } from 'util';
import fs from 'fs';
import { Bot } from 'mineflayer';
import { goals } from 'mineflayer-pathfinder';

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
export const readFilePromise = promisify(fs.readFile);
export const existsPromise = promisify(fs.exists);

export const moveTo = (bot: Bot, goal: goals.Goal): Promise<void> => {
    bot.pathfinder.setGoal(goal);
    return new Promise<void>((resolve, reject) => {
        bot.once('path_reset', () => reject('Path reset'));
        bot.once('goal_reached', () => resolve());
    });
};

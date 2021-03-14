import { createBot } from 'mineflayer';
import { execute } from '@tesseract/action/manager';
import { Movements, pathfinder } from 'mineflayer-pathfinder';
import minecraftData from 'minecraft-data';
import Logger from '@tesseract/util/logger';
import chalk from 'chalk';

// TODO: Add GPT-3 lol

const bot = createBot({
    username: 'Dev',
    host: 'localhost',
    port: 25566,
});

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
    const mcData = minecraftData(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, mcData));
    Logger.info('Spawned!');
});

bot.on('chat', (username, message) => {
    Logger.info(`${chalk.blue('[CHAT]')} ${username}: ${message}`);
    if (username !== bot.username) execute({ bot, executor: bot.players[username] }, message);
});

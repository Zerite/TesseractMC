import { createBot } from 'mineflayer';
import { cancel, execute } from '@tesseract/action/manager';
import { Movements, pathfinder } from 'mineflayer-pathfinder';
import minecraftData from 'minecraft-data';
import Logger from '@tesseract/util/logger';
import chalk from 'chalk';
import * as dotEnv from 'dotenv-extended';
import { request } from '@tesseract/action/openai';

const env = {
    development: 'dev.env',
    production: '.env',
};

dotEnv.load({
    path: env[process.env.NODE_ENV || 'development'],
    errorOnRegex: true,
});

const bot = createBot({
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_PASSWORD,
    host: process.env.BOT_HOST,
    port: parseInt(process.env.BOT_PORT),
});

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
    const mcData = minecraftData(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, mcData));
    Logger.info('Spawned!');
});

bot.on('chat', async (username, message) => {
    Logger.info(`${chalk.blue('[CHAT]')} ${username}: ${message}`);
    if (username === bot.username) return;

    if (process.env.OPENAI_ENABLED?.toLowerCase() === 'true') {
        const context = { bot, executor: bot.players[username], stopping: false };
        const response = await request(context, message);

        Logger.info(`${chalk.red('[OPENAI]')} ${response}`);
        cancel();
        if (response) await execute(context, response);
    } else {
        await execute({ bot, executor: bot.players[username], stopping: false }, message);
    }
});

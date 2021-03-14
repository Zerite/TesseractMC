import * as nearley from 'nearley';
import grammar from '@tesseract/grammar/grammar';
import { ExecutionContext, Task, TaskType } from '@tesseract/action/task';
import SayTask from '@tesseract/action/task/say';
import MoveToTask from '@tesseract/action/task/moveTo';
import StopTask from '@tesseract/action/task/stop';
import AttackTask from '@tesseract/action/task/attack';
import RunScriptTask from '@tesseract/action/task/runScript';
import ExecuteProcessor from '@tesseract/action/processor/execute';
import ExecuteAllProcessor from '@tesseract/action/processor/executeAll';
import RepeatProcessor from '@tesseract/action/processor/repeat';
import Logger from '@tesseract/util/logger';
import { ParsedProcessor, Processor, ProcessorType } from '@tesseract/action/processor';
import chalk from 'chalk';
import colorizeJson from 'json-colorizer';
import { readFilePromise } from '@tesseract/util/promise';

export const tasks: Record<TaskType, Task<unknown>> = {
    say: SayTask,
    moveTo: MoveToTask,
    stop: StopTask,
    attack: AttackTask,
    runScript: RunScriptTask,
};

const processors: Record<ProcessorType, Processor<unknown>> = {
    execute: ExecuteProcessor,
    executeAll: ExecuteAllProcessor,
    repeat: RepeatProcessor,
};

const contexts: ExecutionContext[] = [];

export const cancel = (): void => contexts.forEach((value) => (value.stopping = true));
export const executeScript = async (context: ExecutionContext, name: string): Promise<void> =>
    await execute(context, (await readFilePromise(name)).toString().replace(/\n|\r|\n\r/g, ' '));

export const execute = async (context: ExecutionContext, text: string): Promise<void> => {
    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar)).feed(text);
        if (!parser.results) return Logger.error("Couldn't parse input");

        contexts.push(context);
        await process(context, parser.results[0] as ParsedProcessor<unknown>);
        contexts.splice(contexts.indexOf(context), 1);
    } catch (e) {
        // TODO: Change this
        Logger.error(e.toString());
        context.bot.chat(e.toString().split('\n').shift());
    }
};

export const process = async (context: ExecutionContext, processor: ParsedProcessor<unknown>): Promise<void> => {
    if (context.stopping) return Logger.debug('Stopping execution.');
    Logger.debug(`${chalk.green('[EXECUTING]')} ${processor.type}:`, colorizeJson(JSON.stringify(processor.data)));
    await processors[processor.type]?.execute(context, processor.data);
};

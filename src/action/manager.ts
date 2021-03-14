import * as nearley from 'nearley';
import grammar from '@tesseract/grammar/grammar';
import { ExecutionContext, Task } from '@tesseract/action/task';
import SayTask from '@tesseract/action/task/say';
import MoveToTask from '@tesseract/action/task/moveTo';
import StopTask from '@tesseract/action/task/stop';
import ExecuteProcessor from '@tesseract/action/processor/execute';
import ExecuteAllProcessor from '@tesseract/action/processor/executeAll';
import Logger from '@tesseract/util/logger';
import { ParsedProcessor, Processor, ProcessorType } from '@tesseract/action/processor';
import chalk from 'chalk';
import colorizeJson from 'json-colorizer';

export const tasks: { [key: string]: Task<unknown> } = {
    say: SayTask,
    moveTo: MoveToTask,
    stop: StopTask,
};

const processors: Record<ProcessorType, Processor<unknown>> = {
    execute: ExecuteProcessor,
    executeAll: ExecuteAllProcessor,
};

export const execute = async (context: ExecutionContext, text: string): Promise<void> => {
    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar)).feed(text);
        if (!parser.results) return Logger.error("Couldn't parse input");
        await process(context, parser.results[0] as ParsedProcessor<unknown>);
    } catch (e) {
        // TODO: Change this
        Logger.error(e.toString());
        context.bot.chat(e.toString().split('\n').shift());
    }
};

export const process = async (context: ExecutionContext, processor: ParsedProcessor<unknown>): Promise<void> => {
    Logger.debug(`${chalk.green('[EXECUTING]')} ${processor.type}:`, colorizeJson(JSON.stringify(processor.data)));
    await processors[processor.type]?.execute(context, processor.data);
};

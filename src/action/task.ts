import { Bot, Player } from 'mineflayer';

export interface ExecutionContext {
    bot: Bot;
    executor?: Player;
}

export interface ParsedTask<T extends TaskData> {
    task: string;
    data: T;
}

export interface Position {
    basic?: {
        entity?: {
            special?: 'me';
            player?: string;
        };
        coordinates?: {
            x: number;
            y?: number;
            z: number;
        };
    };
}

export type TaskData = Record<string, unknown> | unknown;

export interface Task<T extends TaskData> {
    execute(context: ExecutionContext, parsed: ParsedTask<T>): void;
}

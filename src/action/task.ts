import { Bot, Player } from 'mineflayer';

export type TaskType = 'attack' | 'moveTo' | 'say' | 'stop' | 'runScript' | string;

export interface ExecutionContext {
    bot: Bot;
    executor?: Player;
    stopping: boolean;
}

export interface ParsedTask<T extends TaskData> {
    task: TaskType;
    data: T;
}

export interface ParsedEntity {
    special?: 'me';
    player?: string;
    mob?: string;
}

export interface ParsedPosition {
    basic?: {
        entity?: ParsedEntity;
        coordinates?: {
            x: number;
            y?: number;
            z: number;
        };
    };
    relative?: ParsedPosition;
}

export type TaskData = Record<string, unknown> | unknown;

export interface Task<T extends TaskData> {
    execute(context: ExecutionContext, parsed: ParsedTask<T>): Promise<void>;
}

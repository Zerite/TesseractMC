import { ExecutionContext, TaskData } from '@tesseract/action/task';

export type ProcessorType = 'execute' | 'executeAll';

export interface ParsedProcessor<T extends TaskData> {
    type: ProcessorType;
    data: T;
}

export interface Processor<T extends TaskData> {
    execute(context: ExecutionContext, data: T): Promise<void>;
}

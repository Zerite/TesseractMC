import { ExecutionContext } from '@tesseract/action/task';
import { ParsedProcessor, Processor } from '@tesseract/action/processor';
import { process } from '@tesseract/action/manager';

interface Data {
    tasks: ParsedProcessor<unknown>[];
}

class ExecuteAllProcessor implements Processor<Data> {
    async execute(context: ExecutionContext, data: Data): Promise<void> {
        for (const task of data.tasks) {
            if (context.stopping) return;
            await process(context, task);
        }
    }
}

export default new ExecuteAllProcessor();

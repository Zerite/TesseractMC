import { ExecutionContext } from '@tesseract/action/task';
import { ParsedProcessor, Processor } from '@tesseract/action/processor';
import { process } from '@tesseract/action/manager';
import { delay } from '@tesseract/util/promise';

interface Data {
    task: ParsedProcessor<unknown>;
}

class RepeatProcessor implements Processor<Data> {
    async execute(context: ExecutionContext, data: Data): Promise<void> {
        while (!context.stopping) {
            await process(context, data.task);
            await delay(50);
        }
    }
}

export default new RepeatProcessor();

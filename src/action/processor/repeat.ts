import { ExecutionContext } from '@tesseract/action/task';
import { ParsedProcessor, Processor } from '@tesseract/action/processor';
import { process } from '@tesseract/action/manager';
import { delay } from '@tesseract/util/promise';
import { ParsedCondition, test } from '@tesseract/action/condition';

interface Data {
    task: ParsedProcessor<unknown>;
    until?: ParsedCondition<unknown>;
    count?: number;
}

class RepeatProcessor implements Processor<Data> {
    async execute(context: ExecutionContext, data: Data): Promise<void> {
        if (data.count) {
            for (let i = 0; i < data.count; i++) {
                await process(context, data.task);
                await delay(50);
            }
        } else {
            while (!context.stopping && test(context, data.until)) {
                await process(context, data.task);
                await delay(50);
            }
        }
    }
}

export default new RepeatProcessor();

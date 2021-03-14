import { ExecutionContext } from '@tesseract/action/task';
import { ParsedProcessor, Processor } from '@tesseract/action/processor';
import { process } from '@tesseract/action/manager';

interface Data {
    tasks: ParsedProcessor<unknown>[];
}

class ExecuteAllProcessor implements Processor<Data> {
    execute(context: ExecutionContext, data: Data): void {
        data.tasks.forEach((value) => process(context, value));
    }
}

export default new ExecuteAllProcessor();

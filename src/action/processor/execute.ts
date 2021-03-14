import { ExecutionContext, ParsedTask } from '@tesseract/action/task';
import { Processor } from '@tesseract/action/processor';
import { tasks } from '@tesseract/action/manager';

interface Data {
    task: ParsedTask<unknown>;
}

class ExecuteProcessor implements Processor<Data> {
    execute(context: ExecutionContext, data: Data): void {
        tasks[data.task.task]?.execute(context, data.task);
    }
}

export default new ExecuteProcessor();

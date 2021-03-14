import { ExecutionContext, ParsedTask, Task } from '@tesseract/action/task';
import { executeScript } from '@tesseract/action/manager';
import { existsPromise } from '@tesseract/util/promise';

interface Data {
    path: string;
}

class RunScript implements Task<Data> {
    async execute(context: ExecutionContext, parsed: ParsedTask<Data>): Promise<void> {
        // TODO: Secure this
        if (!(await existsPromise(parsed.data.path))) throw Error('Invalid script!');
        await executeScript(context, parsed.data.path);
    }
}

export default new RunScript();

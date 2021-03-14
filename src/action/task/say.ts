import { ExecutionContext, ParsedTask, Task } from '@tesseract/action/task';

interface Data {
    text: string;
}

class SayTask implements Task<Data> {
    execute(context: ExecutionContext, parsed: ParsedTask<Data>): void {
        context.bot.chat(parsed.data.text);
    }
}

export default new SayTask();

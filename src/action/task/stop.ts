import { ExecutionContext, Task } from '@tesseract/action/task';
import { cancel } from '@tesseract/action/manager';

class StopTask implements Task<unknown> {
    async execute(context: ExecutionContext): Promise<void> {
        context.bot.pathfinder.setGoal(null);
        cancel();
    }
}

export default new StopTask();

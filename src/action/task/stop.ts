import { ExecutionContext, Task } from '@tesseract/action/task';

class StopTask implements Task<unknown> {
    async execute(context: ExecutionContext): Promise<void> {
        context.bot.pathfinder.setGoal(null);
    }
}

export default new StopTask();

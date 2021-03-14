import { ExecutionContext, ParsedPosition, ParsedTask, Task } from '@tesseract/action/task';
import { getPosition } from '@tesseract/util/types';
import { goals } from 'mineflayer-pathfinder';

interface Data {
    position: ParsedPosition;
}

class MoveToTask implements Task<Data> {
    async execute(context: ExecutionContext, parsed: ParsedTask<Data>): Promise<void> {
        const position = getPosition(context, parsed.data.position);
        if (!position) throw Error('Invalid position!');

        let goal;
        if (position.y >= 0) goal = new goals.GoalBlock(position.x, position.y, position.z);
        else goal = new goals.GoalXZ(position.x, position.z);

        if (!goal) throw Error('Invalid goal!');
        context.bot.pathfinder.setGoal(goal);

        return new Promise<void>((resolve, reject) => {
            context.bot.once('path_reset', () => reject('Path reset'));
            context.bot.once('goal_reached', () => resolve());
        });
    }
}

export default new MoveToTask();

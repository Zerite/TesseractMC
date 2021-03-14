import { ExecutionContext, ParsedTask, Position, Task } from '@tesseract/action/task';
import { getPosition } from '@tesseract/util/position';
import { goals } from 'mineflayer-pathfinder';

interface Data {
    position: Position;
}

class MoveToTask implements Task<Data> {
    execute(context: ExecutionContext, parsed: ParsedTask<Data>): void {
        const position = getPosition(context, parsed.data.position);
        if (!position) throw Error('Invalid position!');

        let goal;
        if (position.y >= 0) goal = new goals.GoalBlock(position.x, position.y, position.z);
        else goal = new goals.GoalXZ(position.x, position.z);

        if (!goal) throw Error('Invalid goal!');
        context.bot.pathfinder.setGoal(goal);
    }
}

export default new MoveToTask();

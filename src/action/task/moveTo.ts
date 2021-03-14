import { ExecutionContext, ParsedPosition, ParsedTask, Task } from '@tesseract/action/task';
import { getPosition } from '@tesseract/util/types';
import { goals } from 'mineflayer-pathfinder';
import { moveTo } from '@tesseract/util/promise';

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
        return moveTo(context.bot, goal);
    }
}

export default new MoveToTask();

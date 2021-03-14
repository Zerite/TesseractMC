import { ExecutionContext, ParsedEntity, ParsedTask, Task } from '@tesseract/action/task';
import { getEntity } from '@tesseract/util/types';
import { delay, moveTo } from '@tesseract/util/promise';
import { goals } from 'mineflayer-pathfinder';

interface Data {
    entity: ParsedEntity;
}

class AttackTask implements Task<Data> {
    async execute(context: ExecutionContext, parsed: ParsedTask<Data>): Promise<void> {
        const entity = getEntity(context, parsed.data.entity);
        if (!entity) throw Error('Entity not found!');

        await moveTo(context.bot, new goals.GoalNear(entity.position.x, entity.position.y, entity.position.z, 3));
        context.bot.attack(entity);
        await delay(300);
    }
}

export default new AttackTask();

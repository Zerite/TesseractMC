import { ExecutionContext, ParsedEntity, ParsedTask, Task } from '@tesseract/action/task';
import { getEntity } from '@tesseract/util/types';

interface Data {
    entity: ParsedEntity;
}

class AttackTask implements Task<Data> {
    async execute(context: ExecutionContext, parsed: ParsedTask<Data>): Promise<void> {
        const entity = getEntity(context, parsed.data.entity);
        if (!entity) throw Error('Entity not found!');
        context.bot.attack(entity);
    }
}

export default new AttackTask();

import { ExecutionContext, ParsedPosition } from '@tesseract/action/task';
import { ConditionProcessor } from '@tesseract/action/condition';
import { getPosition } from '@tesseract/util/types';

interface Data {
    position: ParsedPosition;
}

class AtCondition implements ConditionProcessor<Data> {
    test(context: ExecutionContext, data: Data): boolean {
        const position = getPosition(context, data.position);
        if (!position) return false;
        return position.floored().equals(context.bot.entity.position.floored());
    }
}

export default new AtCondition();

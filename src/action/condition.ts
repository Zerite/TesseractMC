import { ExecutionContext, TaskData } from '@tesseract/action/task';
import AtCondition from '@tesseract/action/condition/at';

export type ConditionType = 'at' | string;

export interface ParsedCondition<T extends TaskData> {
    type: ConditionType;
    data: T;
}

export interface ConditionProcessor<T extends TaskData> {
    test(context: ExecutionContext, data: T): boolean;
}

const conditions: Record<ConditionType, ConditionProcessor<unknown>> = {
    at: AtCondition,
};

export const test = (context: ExecutionContext, condition?: ParsedCondition<unknown>): boolean =>
    condition == null ? true : conditions[condition.type]?.test(context, condition);

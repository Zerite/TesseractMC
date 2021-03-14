import { Vec3 } from 'vec3';
import { ExecutionContext, ParsedEntity, ParsedPosition } from '@tesseract/action/task';
import { Entity } from 'prismarine-entity';

export const getPosition = (context: ExecutionContext, position: ParsedPosition): Vec3 | undefined => {
    if (position.basic) {
        if (position.basic.entity) {
            const pos = getEntity(context, position.basic.entity)?.position;
            if (!pos) return undefined;

            for (let y = pos.y; y > 0; y--) {
                if (context.bot.blockAt(new Vec3(pos.x, y, pos.z)).type === 0) continue;
                pos.y = y;
                break;
            }

            return pos.add(new Vec3(0, 1, 0));
        } else if (position.basic.coordinates)
            return new Vec3(
                position.basic.coordinates.x,
                position.basic.coordinates.y || -1,
                position.basic.coordinates.z,
            );
    } else if (position.relative) {
        const pos = context.bot.entity.position.clone().add(getPosition(context, position.relative));

        return pos.add(new Vec3(0, 1, 0));
    }
};

export const getEntity = (context: ExecutionContext, entity: ParsedEntity): Entity | undefined => {
    if (entity?.special === 'me') return context.executor?.entity;
    if (entity?.player) {
        const name = entity?.player === '%ME%' ? context.executor.username || entity.player : entity.player;
        return context.bot.players[
            Object.keys(context.bot.players).find((key) => key.toLowerCase() === name.toLowerCase())
        ]?.entity;
    }

    if (entity?.mob) {
        const type = entity?.mob?.toLowerCase();
        return context.bot.nearestEntity((entity) => entity.mobType?.toLowerCase() === type);
    }
};

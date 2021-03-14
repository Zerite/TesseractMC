import { Vec3 } from 'vec3';
import { ExecutionContext, ParsedEntity, ParsedPosition } from '@tesseract/action/task';
import { Entity } from 'prismarine-entity';

export const getPosition = (context: ExecutionContext, position: ParsedPosition): Vec3 | undefined => {
    if (position.basic) {
        if (position.basic.entity) return getEntity(context, position.basic.entity)?.position;
        else if (position.basic.coordinates)
            return new Vec3(
                position.basic.coordinates.x,
                position.basic.coordinates.y || -1,
                position.basic.coordinates.z,
            );
    } else if (position.relative)
        return context.bot.entity.position.clone().add(getPosition(context, position.relative));
};

export const getEntity = (context: ExecutionContext, entity: ParsedEntity): Entity | undefined => {
    if (entity?.special === 'me') return context.executor?.entity;
    if (entity?.player)
        return context.bot.players[
            Object.keys(context.bot.players).find((key) => key.toLowerCase() === entity.player.toLowerCase())
        ]?.entity;

    if (entity?.mob) {
        const type = entity?.mob?.toLowerCase();
        return context.bot.nearestEntity((entity) => entity.mobType?.toLowerCase() === type);
    }
};

import { Vec3 } from 'vec3';
import { ExecutionContext, Position } from '@tesseract/action/task';

export const getPosition = (context: ExecutionContext, position: Position): Vec3 | undefined => {
    if (position.basic) {
        if (position.basic.entity) {
            if (position.basic.entity?.special === 'me') return context.executor?.entity?.position;
            if (position.basic.entity?.player)
                return context.bot.players[
                    Object.keys(context.bot.players).find(
                        (key) => key.toLowerCase() === position.basic.entity.player.toLowerCase(),
                    )
                ]?.entity?.position;
        } else if (position.basic.coordinates) {
            return new Vec3(
                position.basic.coordinates.x,
                position.basic.coordinates.y || -1,
                position.basic.coordinates.z,
            );
        }
    }
    return undefined;
};

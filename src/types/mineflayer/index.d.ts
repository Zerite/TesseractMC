import { Pathfinder } from 'mineflayer-pathfinder';

declare module 'mineflayer' {
    export interface Bot {
        pathfinder: Pathfinder;
    }

    export interface BotEvents {
        goal_reached: () => void;
        path_reset: () => void;
    }
}

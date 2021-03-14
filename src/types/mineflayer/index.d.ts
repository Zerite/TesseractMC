import { Pathfinder } from 'mineflayer-pathfinder';

declare module 'mineflayer' {
    export interface Bot {
        pathfinder: Pathfinder;
    }
}

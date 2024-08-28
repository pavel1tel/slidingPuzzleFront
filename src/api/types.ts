export interface CreateGameResponse {
    gameId : number;
}

export interface GetGameResponse {
    board : number[][];
    startTime: string;
    endTime: string | null;
}

export enum MoveDirection {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
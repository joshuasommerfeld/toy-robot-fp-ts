import { Board } from "../models/Board";
import { Either } from "fp-ts/Either";

export enum Action {
    PLACE = "PLACE",
    MOVE = "MOVE",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    REPORT = "REPORT",
    EXIT = "EXIT",
}

export interface ActionExecutionResult {
    action: Action;
    board: Board;
}

export type Executor = (
    board: Board,
    command: string
) => Either<Error[], ActionExecutionResult>;

export interface ActionExecutor {
    action: Action;
    executor: Executor;
}

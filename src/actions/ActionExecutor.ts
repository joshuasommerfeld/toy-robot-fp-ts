import { Either } from "fp-ts/Either";
import { Option } from "fp-ts/Option";

import { Board } from "../models/Board";

export enum ActionType {
    QUERY,
    MUTATION,
    TERMINATION,
}

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

export type Mutation = (
    board: Board,
    command: string
) => Either<Error[], Board>;

export type Query = (
    board: Board,
    command: string
) => Either<Error[], Option<string>>;

export interface IActionExecutor {
    action: Action;
}

export interface QueryActionExecutor extends IActionExecutor {
    action: Action;
    actionType: ActionType.QUERY;
    query: Query;
}

export interface MutationActionExecutor extends IActionExecutor {
    action: Action;
    actionType: ActionType.MUTATION;
    mutation: Mutation;
}

export interface TerminationActionExecutor extends IActionExecutor {
    action: Action;
    actionType: ActionType.TERMINATION;
    systemProcess: () => Either<Error[], Option<string>>;
}

export type ActionExecutor =
    | QueryActionExecutor
    | MutationActionExecutor
    | TerminationActionExecutor;

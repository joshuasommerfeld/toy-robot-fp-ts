import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { Action, ActionType, MutationActionExecutor } from "./ActionExecutor";
import { Board } from "../models/Board";
import { applyNewToyRobotPosition } from "../transformations/ApplyPosition";
import { getPlacedToyRobot } from "../transformations/GetPlacedToyRobot";
import {
    rotatePositionDirection,
    TurnDirection,
} from "../models/PositionDirection";

const turn =
    (turnDirection: TurnDirection) =>
    (board: Board, _: string): E.Either<Error[], Board> =>
        pipe(
            getPlacedToyRobot(board),
            E.chain((toyRobot) =>
                E.right(rotatePositionDirection(turnDirection)(toyRobot))
            ),
            E.chain(applyNewToyRobotPosition(board))
        );

export const leftExecutor: MutationActionExecutor = {
    action: Action.LEFT,
    actionType: ActionType.MUTATION,
    mutation: turn(TurnDirection.LEFT),
};

export const rightExecutor: MutationActionExecutor = {
    action: Action.RIGHT,
    actionType: ActionType.MUTATION,
    mutation: turn(TurnDirection.RIGHT),
};

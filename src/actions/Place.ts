import { Board } from "../models/Board";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { hasPositionDirection } from "../transformations/HasPositionDirection";
import { calculateForwardPositionDirection } from "../models/PositionDirection";
import { applyNewToyRobotPosition } from "../transformations/ApplyPosition";
import {
    Action,
    ActionExecutionResult,
    ActionExecutor,
} from "./ActionExecutor";
import { right } from "fp-ts/Either";

export const place = (
    board: Board,
    command: string
): E.Either<Error[], ActionExecutionResult> =>
    pipe(
        hasPositionDirection(command),
        E.chain(calculateForwardPositionDirection),
        E.chain(applyNewToyRobotPosition(board)),
        E.chain((board) =>
            right({
                action: Action.PLACE,
                board,
            })
        )
    );

export const placeExecutor: ActionExecutor = {
    action: Action.PLACE,
    executor: place,
};

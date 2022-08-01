import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { Board } from "../models/Board";
import { getPositionDirectionFromCommand } from "../transformations/GetPositionDirectionFromCommand";
import { applyNewToyRobotPosition } from "../transformations/ApplyPosition";
import { Action, ActionType, MutationActionExecutor } from "./ActionExecutor";

export const place = (
    board: Board,
    command: string
): E.Either<Error[], Board> =>
    pipe(
        getPositionDirectionFromCommand(command),
        E.chain(applyNewToyRobotPosition(board))
    );

export const placeExecutor: MutationActionExecutor = {
    action: Action.PLACE,
    actionType: ActionType.MUTATION,
    mutation: place,
};

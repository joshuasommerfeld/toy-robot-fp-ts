import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { Action, ActionType, MutationActionExecutor } from "./ActionExecutor";
import { Board } from "../models/Board";
import { getPlacedToyRobot } from "../transformations/GetPlacedToyRobot";
import { calculateForwardPositionDirection } from "../models/PositionDirection";
import { applyNewToyRobotPosition } from "../transformations/ApplyPosition";

const move = (board: Board, _: string): E.Either<Error[], Board> =>
    pipe(
        getPlacedToyRobot(board),
        E.chain((toyRobot) =>
            E.right(calculateForwardPositionDirection(toyRobot))
        ),
        E.chain(applyNewToyRobotPosition(board))
    );

export const moveExecutor: MutationActionExecutor = {
    action: Action.MOVE,
    actionType: ActionType.MUTATION,
    mutation: move,
};

import { Board } from "../models/Board";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import { Action, ActionType, QueryActionExecutor } from "./ActionExecutor";
import { pipe } from "fp-ts/function";
import { stringifyPositionDirection } from "../models/PositionDirection";
import { getPlacedToyRobot } from "../transformations/GetPlacedToyRobot";

const report = (board: Board, _: string): E.Either<Error[], Option<string>> =>
    pipe(
        getPlacedToyRobot(board),
        E.chain((toyRobot) =>
            E.right(O.some(stringifyPositionDirection(toyRobot)))
        )
    );

export const reportExecutor: QueryActionExecutor = {
    action: Action.REPORT,
    actionType: ActionType.QUERY,
    query: report,
};

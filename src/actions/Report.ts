import { Board } from "../models/Board";
import * as E from "fp-ts/Either";
import {
    Action,
    ActionExecutionResult,
    ActionExecutor,
} from "./ActionExecutor";
import { pipe } from "fp-ts/function";
import { hasBeenPlaced } from "../transformations/HasBeenPlaced";

const report = (
    board: Board,
    command: string
): E.Either<Error[], ActionExecutionResult> =>
    pipe(
        hasBeenPlaced(board),
        E.chain((_) =>
            E.right({
                action: Action.REPORT,
                board,
            })
        )
    );

export const reportExecutor: ActionExecutor = {
    action: Action.REPORT,
    executor: report,
};

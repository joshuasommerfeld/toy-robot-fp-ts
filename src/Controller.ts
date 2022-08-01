import * as E from "fp-ts/Either";
import { Either } from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import { pipe } from "fp-ts/function";

import { Board } from "./models/Board";
import { ActionExecutor, ActionType } from "./actions/ActionExecutor";

import { parseAction as parseActionRaw } from "./actions";

/**
 * @param line - line read from CLI
 * @returns Either an array of errors, or a boolean.
 *    If the boolean is true, it exits the program, otherwise it continues to prompt
 */

export class Controller {
    board: Board;
    parseAction: (line: string) => Either<Error[], ActionExecutor>;

    constructor(size: number, parseAction = parseActionRaw) {
        this.board = {
            width: size,
            height: size,
            toyRobot: O.none,
        };
        this.parseAction = parseAction;
    }

    /* Board mutation side effect */
    protected boardMutation = (board: Board): Either<Error[], null> => {
        this.board = board;
        return E.right(null);
    };

    parseLine = (line: string): Either<Error[], Option<string>> =>
        pipe(
            this.parseAction(line),
            E.chain((actionExecutor) => {
                switch (actionExecutor.actionType) {
                    case ActionType.QUERY:
                        return actionExecutor.query(this.board, line);
                    case ActionType.MUTATION:
                        return pipe(
                            actionExecutor.mutation(this.board, line),
                            E.chain(this.boardMutation),
                            E.chain((_) => E.right(O.none))
                        );
                    case ActionType.TERMINATION:
                        return actionExecutor.systemProcess();
                }
            })
        );
}

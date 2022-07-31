import { Either, left, right } from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import { Board } from "./models/Board";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { placeExecutor } from "./actions/Place";
import { Action, ActionExecutor } from "./actions/ActionExecutor";
import { stringifyPositionDirection } from "./models/PositionDirection";
import { reportExecutor } from "./actions/Report";

/**
 * @param line - line read from CLI
 * @returns Either an array of errors, or a boolean.
 *    If the boolean is true, it exits the program, otherwise it continues to prompt
 */

export class Controller {
    board: Board;

    constructor(size: number) {
        this.board = {
            width: size,
            height: size,
            toyRobot: O.none,
        };
    }

    parseAction = (line: string): Either<Error[], ActionExecutor> => {
        switch (line.split(/\s/)[0].trim()) {
            case Action.PLACE:
                return right(placeExecutor);
            case Action.REPORT:
                return right(reportExecutor);
            case Action.EXIT:
                process.exit(0);
            default:
                return left([new Error(`"${line}" is not a valid command.`)]);
        }
    };

    parseLine = (line: string): Either<Error[], Option<string>> =>
        pipe(
            this.parseAction(line),
            E.chain((actionExecutor) =>
                actionExecutor.executor(this.board, line)
            ),
            E.chain((result) => {
                this.board = result.board;
                if (
                    result.action === Action.REPORT &&
                    O.isSome(this.board.toyRobot)
                ) {
                    return right(
                        O.some(
                            stringifyPositionDirection(
                                this.board.toyRobot.value
                            )
                        )
                    );
                }
                return right(O.none);
            })
        );
}

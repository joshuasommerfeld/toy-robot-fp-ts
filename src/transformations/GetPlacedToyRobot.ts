import { Board } from "../models/Board";
import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import { isSome } from "fp-ts/Option";
import { PositionDirection } from "../models/PositionDirection";

/**
 * @param board - The current board state to mutate
 * @returns Either an array of errors, or the robot that's on the board
 */
export const getPlacedToyRobot = (
    board: Board
): Either<Error[], PositionDirection> => {
    if (isSome(board.toyRobot)) {
        return E.right(board.toyRobot.value);
    } else {
        return E.left([new Error("Robot has not been placed")]);
    }
};

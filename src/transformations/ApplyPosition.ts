import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

import { PositionDirection } from "../models/PositionDirection";
import { Board } from "../models/Board";

/**
 * @param board - The current board state to mutate
 * @param newPositionDirection - The new intended position of the robot
 * @returns Either an array of errors, or the new Board with updated board state
 */
export const applyNewToyRobotPosition =
    (board: Board) =>
    (newPositionDirection: PositionDirection): Either<Error[], Board> => {
        const { position } = newPositionDirection;
        if (
            position.x >= board.width ||
            position.x < 0 ||
            position.y >= board.height ||
            position.y < 0
        ) {
            return E.left([
                new Error(
                    `Position ${position.x},${position.y} is off the board.`
                ),
            ]);
        }
        return E.right({
            ...board,
            toyRobot: O.some(newPositionDirection),
        });
    };

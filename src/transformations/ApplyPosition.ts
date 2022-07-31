import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

import { PositionDirection } from "../models/PositionDirection";
import { Board } from "../models/Board";

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

import { PositionDirection } from "../models/PositionDirection";
import { Board } from "../models/Board";
import { Either, left, right } from "fp-ts/Either";
import { some } from "fp-ts/Option";

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
            return left([
                new Error(
                    `Position ${position.x},${position.y} is off the board.`
                ),
            ]);
        }
        return right({
            ...board,
            toyRobot: some(newPositionDirection),
        });
    };

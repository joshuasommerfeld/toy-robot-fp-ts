import { Board } from "../models/Board";
import { Either, left, right } from "fp-ts/Either";
import { isSome } from "fp-ts/Option";

export const hasBeenPlaced = (board: Board): Either<Error[], null> => {
    if (isSome(board.toyRobot)) {
        return right(null);
    } else {
        return left([new Error("Robot has not been placed")]);
    }
};

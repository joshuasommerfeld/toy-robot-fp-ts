import { Either, left, right } from "fp-ts/Either";
import {
    Direction,
    PositionDirection,
    stringsToPositionDirection,
    stringToDirection,
} from "../models/PositionDirection";

export const hasPositionDirection = (
    command: string
): Either<Error[], PositionDirection> => {
    const args = command.trim().split(/\s/);
    if (args.length < 2) {
        return left([new Error("No position or direction given")]);
    }

    const maybePositionDirection = args[1];
    const [xRaw, yRaw, directionRaw] = maybePositionDirection.split(",");
    if (!xRaw || !yRaw || !directionRaw) {
        return left([
            new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
        ]);
    }

    return stringsToPositionDirection(xRaw, yRaw, directionRaw);
};

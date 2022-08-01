import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import {
    PositionDirection,
    stringsToPositionDirection,
} from "../models/PositionDirection";

/**
 * @description returns a correctly formatted string into an instance of PositionDirection
 * @param command - Full command string, including the prefixed command (usually "PLACE")
 * @returns Either an array of errors, or a PositionDirection object if the input is valid
 */
export const getPositionDirectionFromCommand = (
    command: string
): Either<Error[], PositionDirection> => {
    const args = command.trim().split(/\s/);
    if (args.length < 2) {
        return E.left([new Error("No position or direction given")]);
    }

    const maybePositionDirection = args[1];
    const [xRaw, yRaw, directionRaw] = maybePositionDirection.split(",");
    if (!xRaw || !yRaw || !directionRaw) {
        return E.left([
            new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
        ]);
    }

    return stringsToPositionDirection(xRaw, yRaw, directionRaw);
};

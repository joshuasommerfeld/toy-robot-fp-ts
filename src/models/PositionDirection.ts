import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

export enum TurnDirection {
    LEFT = -1,
    RIGHT = 1,
}

export interface Position {
    x: number;
    y: number;
}

export interface PositionDirection {
    position: Position;
    direction: Direction;
}

/**
 * @description returns a formatted string of a PositionDirection in format `x,y,DIRECTION`
 * @param positionDirection - A PositionDirect object
 * @returns a correctly formatted string
 */
export const stringifyPositionDirection = (
    positionDirection: PositionDirection
): string => {
    const { position, direction } = positionDirection;
    return `${position.x},${position.y},${Direction[direction]}`;
};

/**
 * @description transforms a string into a Direction enum
 * @param maybeDirectionRaw - A string that represents a potential Direction
 * @returns a list of errors, or a Direction enum
 */
export const stringToDirection = (
    maybeDirectionRaw: string
): Either<Error[], Direction> => {
    const maybeDirection = maybeDirectionRaw as keyof typeof Direction;
    if (Direction[maybeDirection] === undefined) {
        return E.left([
            new Error(
                `${maybeDirectionRaw} is not a Direction. Expected values are NORTH, EAST, SOUTH, WEST.`
            ),
        ]);
    }
    return E.right(Direction[maybeDirection]);
};

/**
 * @description takes 2 strings ("x" and "y") and returns an instance of Position
 * @param xRaw - The string representation of a "x" co-ordinate
 * @param yRaw - The string representation of a "y" co-ordinate
 * @returns a list of errors, or an instance of Position
 */
export const stringsToPosition = (
    xRaw: string,
    yRaw: string
): Either<Error[], Position> => {
    const maybeX = parseInt(xRaw);
    const maybeY = parseInt(yRaw);

    if (isNaN(maybeX) || isNaN(maybeY)) {
        return E.left([
            new Error(
                `Either ${xRaw} or ${yRaw} is not a number. X and Y co-ordinates must be integer numbers.`
            ),
        ]);
    }
    return E.right({ x: maybeX, y: maybeY });
};

/**
 * @description takes 3 strings ("x", "y" and direction) and returns an instance of PositionDirection.
 * **NOTE** I would like to improve this so stringToDirection is called in parallel with stringsToPosition, but I've run out of time.
 * @param xRaw - The string representation of a "x" co-ordinate
 * @param yRaw - The string representation of a "y" co-ordinate
 * @param directionRaw - The string representation of a Direction
 * @returns a list of errors, or an instance of PositionDirection
 */
export const stringsToPositionDirection = (
    xRaw: string,
    yRaw: string,
    directionRaw: string
): Either<Error[], PositionDirection> =>
    pipe(
        stringsToPosition(xRaw, yRaw),
        E.map((position) =>
            pipe(
                stringToDirection(directionRaw),
                E.map((direction) => ({
                    position,
                    direction,
                }))
            )
        ),
        E.flatten
    );

/**
 * @description takes a PositionDirection and returns a new positionDirection one space forward
 * @param positionDirection - The current PositionDirection
 * @returns a new PositionDirection one space in front of the supplied one.
 */
export const calculateForwardPositionDirection = (
    positionDirection: PositionDirection
): PositionDirection => {
    const { position, direction } = positionDirection;
    switch (direction) {
        case Direction.NORTH:
            return { direction, position: { ...position, y: position.y + 1 } };
        case Direction.SOUTH:
            return { direction, position: { ...position, y: position.y - 1 } };
        case Direction.EAST:
            return { direction, position: { ...position, x: position.x + 1 } };
        case Direction.WEST:
            return { direction, position: { ...position, x: position.x - 1 } };
    }
};

/**
 * @description takes a PositionDirection and returns a new positionDirection rotated left or right
 * @param turnDirection - TurnDirection enum, to determine whether to rotate left or right
 * @param positionDirection - The current PositionDirection
 * @returns a new PositionDirection, rotated in the supplied direction
 */
export const rotatePositionDirection =
    (turnDirection: TurnDirection) =>
    (positionDirection: PositionDirection): PositionDirection => {
        const { position, direction } = positionDirection;
        const directionIndex = direction + turnDirection;
        if (directionIndex < 0) {
            return {
                position,
                direction: Direction.WEST,
            };
        }
        if (directionIndex > 3) {
            return {
                position,
                direction: Direction.NORTH,
            };
        }
        return {
            position,
            direction: directionIndex,
        };
    };

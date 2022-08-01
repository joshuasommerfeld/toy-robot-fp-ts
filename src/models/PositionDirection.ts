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

export const stringifyPositionDirection = (pd: PositionDirection): string =>
    `${pd.position.x},${pd.position.y},${Direction[pd.direction]}`;

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

import { Either, flatten, left, map, right } from "fp-ts/Either";

import { pipe } from "fp-ts/function";

export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

interface Position {
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
        return left([
            new Error(
                `${maybeDirectionRaw} is not a Direction. Expected values are NORTH, EAST, SOUTH, WEST.`
            ),
        ]);
    }
    return right(Direction[maybeDirection]);
};

export const stringsToPosition = (
    xRaw: string,
    yRaw: string
): Either<Error[], Position> => {
    const maybeX = parseInt(xRaw);
    const maybeY = parseInt(yRaw);

    if (isNaN(maybeX) || isNaN(maybeY)) {
        return left([
            new Error(
                `Either ${xRaw} or ${yRaw} is not a number. X and Y co-ordinates must be integer numbers.`
            ),
        ]);
    }
    return right({ x: maybeX, y: maybeY });
};

export const stringsToPositionDirection = (
    xRaw: string,
    yRaw: string,
    directionRaw: string
): Either<Error[], PositionDirection> =>
    pipe(
        stringsToPosition(xRaw, yRaw),
        map((position) =>
            pipe(
                stringToDirection(directionRaw),
                map((direction) => ({
                    position,
                    direction,
                }))
            )
        ),
        flatten
    );

export const calculateForwardPositionDirection = (
    positionDirection: PositionDirection
): Either<Error[], PositionDirection> => {
    const { position, direction } = positionDirection;
    switch (direction) {
        case Direction.NORTH:
            return right({ ...positionDirection, y: position.y + 1 });
        case Direction.SOUTH:
            return right({ ...positionDirection, y: position.y - 1 });
        case Direction.EAST:
            return right({ ...positionDirection, x: position.x + 1 });
        case Direction.WEST:
            return right({ ...positionDirection, x: position.x - 1 });
    }
};

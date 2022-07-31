import {
    Direction,
    PositionDirection,
    stringifyPositionDirection,
    stringsToPosition,
    stringsToPositionDirection,
    stringToDirection,
} from "../PositionDirection";
import * as E from "fp-ts/Either";

describe("PositionDirection", () => {
    describe("stringifyPositionDirection", () => {
        test("x then y then NORTH", () => {
            const pd: PositionDirection = {
                position: {
                    x: 1,
                    y: 2,
                },
                direction: Direction.NORTH,
            };
            expect(stringifyPositionDirection(pd)).toBe("1,2,NORTH");
        });
        test("x then y then EAST", () => {
            const pd: PositionDirection = {
                position: {
                    x: 4,
                    y: 0,
                },
                direction: Direction.EAST,
            };
            expect(stringifyPositionDirection(pd)).toBe("4,0,EAST");
        });
        test("x then y then SOUTH", () => {
            const pd: PositionDirection = {
                position: {
                    x: 2,
                    y: 2,
                },
                direction: Direction.SOUTH,
            };
            expect(stringifyPositionDirection(pd)).toBe("2,2,SOUTH");
        });
        test("x then y then WEST", () => {
            const pd: PositionDirection = {
                position: {
                    x: 6,
                    y: 6,
                },
                direction: Direction.WEST,
            };
            expect(stringifyPositionDirection(pd)).toBe("6,6,WEST");
        });
    });

    describe("stringToDirection", () => {
        test("NORTH to Direction.NORTH", () => {
            expect(stringToDirection("NORTH")).toStrictEqual(
                E.right(Direction.NORTH)
            );
        });
        test("EAST to Direction.EAST", () => {
            expect(stringToDirection("EAST")).toStrictEqual(
                E.right(Direction.EAST)
            );
        });
        test("SOUTH to Direction.SOUTH", () => {
            expect(stringToDirection("SOUTH")).toStrictEqual(
                E.right(Direction.SOUTH)
            );
        });
        test("WEST to Direction.WEST", () => {
            expect(stringToDirection("WEST")).toStrictEqual(
                E.right(Direction.WEST)
            );
        });
        test("UNKNOWN to left", () => {
            expect(stringToDirection("UNKNOWN")).toStrictEqual(
                E.left([
                    new Error(
                        "UNKNOWN is not a Direction. Expected values are NORTH, EAST, SOUTH, WEST."
                    ),
                ])
            );
        });
    });

    describe("stringsToPosition", () => {
        test("x=1 and y=2 to Position", () => {
            expect(stringsToPosition("1", "2")).toStrictEqual(
                E.right({ x: 1, y: 2 })
            );
        });
        test("x=1 and y=null to left", () => {
            expect(stringsToPosition("1", "null")).toStrictEqual(
                E.left([
                    new Error(
                        `Either 1 or null is not a number. X and Y co-ordinates must be integer numbers.`
                    ),
                ])
            );
        });
        test("x=null and y=2 to left", () => {
            expect(stringsToPosition("null", "2")).toStrictEqual(
                E.left([
                    new Error(
                        `Either null or 2 is not a number. X and Y co-ordinates must be integer numbers.`
                    ),
                ])
            );
        });
        test("x='a' and y='b' to left", () => {
            expect(stringsToPosition("a", "b")).toStrictEqual(
                E.left([
                    new Error(
                        `Either a or b is not a number. X and Y co-ordinates must be integer numbers.`
                    ),
                ])
            );
        });
    });

    describe("stringsToPositionDirection", () => {
        test("x=1, y=2 direction=NORTH to PositionDirection", () => {
            expect(stringsToPositionDirection("1", "2", "NORTH")).toStrictEqual(
                E.right({
                    position: { x: 1, y: 2 },
                    direction: Direction.NORTH,
                })
            );
        });
        test("x=1 and y=null direction=NORTH to left", () => {
            expect(
                stringsToPositionDirection("1", "null", "NORTH")
            ).toStrictEqual(
                E.left([
                    new Error(
                        `Either 1 or null is not a number. X and Y co-ordinates must be integer numbers.`
                    ),
                ])
            );
        });
        test("x=1 and y=2 direction=UNKNOWN to left", () => {
            expect(
                stringsToPositionDirection("1", "2", "UNKNOWN")
            ).toStrictEqual(
                E.left([
                    new Error(
                        "UNKNOWN is not a Direction. Expected values are NORTH, EAST, SOUTH, WEST."
                    ),
                ])
            );
        });
        test("x=1 and y=null direction=UNKNOWN to left", () => {
            expect(
                stringsToPositionDirection("1", "null", "UNKNOWN")
            ).toStrictEqual(
                E.left([
                    new Error(
                        `Either 1 or null is not a number. X and Y co-ordinates must be integer numbers.`
                    ),
                ])
            );
        });
    });
});

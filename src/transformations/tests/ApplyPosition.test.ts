import { applyNewToyRobotPosition } from "../ApplyPosition";
import { Board } from "../../models/Board";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import { Direction, PositionDirection } from "../../models/PositionDirection";

describe("applyNewToyRobotPosition", () => {
    const board: Board = {
        width: 5,
        height: 6,
        toyRobot: O.none,
    };

    const validPosition: PositionDirection = {
        position: {
            x: 1,
            y: 2,
        },
        direction: Direction.NORTH,
    };
    test("Valid new position returns new board", () => {
        expect(applyNewToyRobotPosition(board)(validPosition)).toStrictEqual(
            E.right({
                ...board,
                toyRobot: O.some(validPosition),
            })
        );
    });
    test("Too high x returns left", () => {
        const xToohigh = {
            ...validPosition,
            position: {
                x: 5,
                y: 1,
            },
        };
        expect(applyNewToyRobotPosition(board)(xToohigh)).toStrictEqual(
            E.left([new Error("Position 5,1 is off the board.")])
        );
    });
    test("Too high y returns left", () => {
        const yToohigh = {
            ...validPosition,
            position: {
                x: 1,
                y: 6,
            },
        };
        expect(applyNewToyRobotPosition(board)(yToohigh)).toStrictEqual(
            E.left([new Error("Position 1,6 is off the board.")])
        );
    });
    test("Too low x returns left", () => {
        const xTooLow = {
            ...validPosition,
            position: {
                x: -1,
                y: 2,
            },
        };
        expect(applyNewToyRobotPosition(board)(xTooLow)).toStrictEqual(
            E.left([new Error("Position -1,2 is off the board.")])
        );
    });
    test("Too low y returns left", () => {
        const yTooLow = {
            ...validPosition,
            position: {
                x: 1,
                y: -1,
            },
        };
        expect(applyNewToyRobotPosition(board)(yTooLow)).toStrictEqual(
            E.left([new Error("Position 1,-1 is off the board.")])
        );
    });
});

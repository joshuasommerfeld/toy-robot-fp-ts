import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import * as E from "fp-ts/These";

import { Board } from "../../models/Board";
import {
    Direction,
    Position,
    PositionDirection,
} from "../../models/PositionDirection";
import { leftExecutor, rightExecutor } from "../Turn";

describe("Turn", () => {
    const board: Board = {
        width: 5,
        height: 5,
        toyRobot: O.none,
    };

    const position: Position = {
        x: 1,
        y: 2,
    };

    const toyRobot: Option<PositionDirection> = O.some({
        position,
        direction: Direction.NORTH,
    });
    describe("leftExecutor", () => {
        test("valid input returns E.right", () => {
            expect(
                leftExecutor.mutation(
                    {
                        ...board,
                        toyRobot,
                    },
                    "LEFT"
                )
            ).toStrictEqual(
                E.right({
                    ...board,
                    toyRobot: O.some({
                        position,
                        direction: Direction.WEST,
                    }),
                })
            );
        });
        test("no placed robot returns E.left", () => {
            expect(leftExecutor.mutation(board, "LEFT")).toStrictEqual(
                E.left([new Error("Robot has not been placed")])
            );
        });
    });
    describe("rightExecutor", () => {
        test("valid input returns E.right", () => {
            expect(
                rightExecutor.mutation(
                    {
                        ...board,
                        toyRobot,
                    },
                    "RIGHT"
                )
            ).toStrictEqual(
                E.right({
                    ...board,
                    toyRobot: O.some({
                        position,
                        direction: Direction.EAST,
                    }),
                })
            );
        });
        test("no placed robot returns E.left", () => {
            expect(rightExecutor.mutation(board, "RIGHT")).toStrictEqual(
                E.left([new Error("Robot has not been placed")])
            );
        });
    });
});

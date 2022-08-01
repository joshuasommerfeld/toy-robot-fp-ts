import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import * as E from "fp-ts/These";

import { Board } from "../../models/Board";
import { Direction, PositionDirection } from "../../models/PositionDirection";
import { moveExecutor } from "../Move";

describe("Move", () => {
    const board: Board = {
        width: 5,
        height: 5,
        toyRobot: O.none,
    };

    const toyRobot: Option<PositionDirection> = O.some({
        position: {
            x: 1,
            y: 2,
        },
        direction: Direction.NORTH,
    });

    test("move for valid input return rights", () => {
        expect(
            moveExecutor.mutation(
                {
                    ...board,
                    toyRobot,
                },
                "MOVE"
            )
        ).toStrictEqual(
            E.right({
                ...board,
                toyRobot: O.some({
                    position: {
                        x: 1,
                        y: 3,
                    },
                    direction: Direction.NORTH,
                }),
            })
        );
    });
    test("move for no robot returns left", () => {
        expect(moveExecutor.mutation(board, "MOVE")).toStrictEqual(
            E.left([new Error("Robot has not been placed")])
        );
    });
    test("move for invalid input returns left", () => {
        const badToyRobot: Option<PositionDirection> = O.some({
            position: {
                x: 1,
                y: 4,
            },
            direction: Direction.NORTH,
        });
        expect(
            moveExecutor.mutation(
                {
                    ...board,
                    toyRobot: badToyRobot,
                },
                "MOVE"
            )
        ).toStrictEqual(E.left([new Error("Position 1,5 is off the board.")]));
    });
});

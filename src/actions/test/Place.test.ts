import * as O from "fp-ts/Option";
import * as E from "fp-ts/These";

import { Board } from "../../models/Board";
import { Direction } from "../../models/PositionDirection";
import { placeExecutor } from "../Place";

describe("Place", () => {
    const board: Board = {
        width: 5,
        height: 5,
        toyRobot: O.none,
    };

    test("valid input returns right", () => {
        expect(placeExecutor.mutation(board, "PLACE 1,2,NORTH")).toStrictEqual(
            E.right({
                width: 5,
                height: 5,
                toyRobot: O.some({
                    position: {
                        x: 1,
                        y: 2,
                    },
                    direction: Direction.NORTH,
                }),
            })
        );
    });
    test("badly formatted input returns left", () => {
        expect(placeExecutor.mutation(board, "PLACE UNKNOWN")).toStrictEqual(
            E.left([
                new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
            ])
        );
    });
    test("valid input format, but bad target returns left", () => {
        expect(placeExecutor.mutation(board, "PLACE 6,6,NORTH")).toStrictEqual(
            E.left([new Error("Position 6,6 is off the board.")])
        );
    });
});

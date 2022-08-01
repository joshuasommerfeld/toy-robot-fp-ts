import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";

import { getPlacedToyRobot } from "../GetPlacedToyRobot";
import { Board } from "../../models/Board";
import { Direction, PositionDirection } from "../../models/PositionDirection";

describe("hasBeenPlaced", () => {
    const board: Board = {
        width: 5,
        height: 5,
        toyRobot: O.none,
    };

    const toyRobot: PositionDirection = {
        position: {
            x: 1,
            y: 2,
        },
        direction: Direction.EAST,
    };
    test("toy robot is some returns right", () => {
        expect(getPlacedToyRobot(board)).toStrictEqual(
            E.left([new Error("Robot has not been placed")])
        );
    });
    test("toy robot is none returns left", () => {
        expect(
            getPlacedToyRobot({
                ...board,
                toyRobot: O.some(toyRobot),
            })
        ).toStrictEqual(E.right(toyRobot));
    });
});

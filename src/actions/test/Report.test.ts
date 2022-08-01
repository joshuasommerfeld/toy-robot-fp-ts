import * as O from "fp-ts/Option";
import { Option } from "fp-ts/Option";
import * as E from "fp-ts/These";

import { Board } from "../../models/Board";
import { Direction, PositionDirection } from "../../models/PositionDirection";
import { reportExecutor } from "../Report";

describe("Report", () => {
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

    test("valid input returns right", () => {
        expect(
            reportExecutor.query(
                {
                    ...board,
                    toyRobot,
                },
                "REPORT"
            )
        ).toStrictEqual(E.right(O.some("1,2,NORTH")));
    });
    test("robot not placed returns left", () => {
        expect(reportExecutor.query(board, "REPORT")).toStrictEqual(
            E.left([new Error("Robot has not been placed")])
        );
    });
});

import { getPositionDirectionFromCommand } from "../GetPositionDirectionFromCommand";
import * as E from "fp-ts/Either";
import { Direction } from "../../models/PositionDirection";

describe("hasPositionDirection", () => {
    test("PLACE 1,2,NORTH returns PositionDirection", () => {
        expect(
            getPositionDirectionFromCommand("PLACE 1,2,NORTH")
        ).toStrictEqual(
            E.right({ position: { x: 1, y: 2 }, direction: Direction.NORTH })
        );
    });
    test("PLACE returns left", () => {
        expect(getPositionDirectionFromCommand("PLACE")).toStrictEqual(
            E.left([new Error("No position or direction given")])
        );
    });
    test("PLACE 1 returns left", () => {
        expect(getPositionDirectionFromCommand("PLACE 1")).toStrictEqual(
            E.left([
                new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
            ])
        );
    });
    test("PLACE 1,2 returns left", () => {
        expect(getPositionDirectionFromCommand("PLACE 1,2")).toStrictEqual(
            E.left([
                new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
            ])
        );
    });
    test("PLACE NORTH returns left", () => {
        expect(getPositionDirectionFromCommand("PLACE NORTH")).toStrictEqual(
            E.left([
                new Error("Missing X, Y or DIRECTION. Expects X,Y,DIRECTION"),
            ])
        );
    });
});

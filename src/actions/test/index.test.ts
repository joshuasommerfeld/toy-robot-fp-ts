import * as E from "fp-ts/Either";
import { parseAction } from "../index";
import { placeExecutor } from "../Place";
import { moveExecutor } from "../Move";
import { leftExecutor, rightExecutor } from "../Turn";
import { reportExecutor } from "../Report";
import { exitExecutor } from "../Exit";

describe("parseAction", () => {
    test("Get PLACE actionExecutor as right", () => {
        expect(parseAction("PLACE")).toStrictEqual(E.right(placeExecutor));
    });
    test("Get MOVE actionExecutor as right", () => {
        expect(parseAction("MOVE")).toStrictEqual(E.right(moveExecutor));
    });
    test("Get LEFT actionExecutor as right", () => {
        expect(parseAction("LEFT")).toStrictEqual(E.right(leftExecutor));
    });
    test("Get RIGHT actionExecutor as right", () => {
        expect(parseAction("RIGHT")).toStrictEqual(E.right(rightExecutor));
    });
    test("Get REPORT actionExecutor as right", () => {
        expect(parseAction("REPORT")).toStrictEqual(E.right(reportExecutor));
    });
    test("Get EXIT actionExecutor as right", () => {
        expect(parseAction("EXIT")).toStrictEqual(E.right(exitExecutor));
    });
    test("receive error on bad input as left", () => {
        expect(parseAction("UNKNOWN")).toStrictEqual(
            E.left([new Error('"UNKNOWN" is not a valid command.')])
        );
    });
});

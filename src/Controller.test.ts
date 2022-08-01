import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

import { Controller } from "./Controller";
import {
    Action,
    ActionType,
    TerminationActionExecutor,
} from "./actions/ActionExecutor";

describe("Controller", () => {
    describe("parseLine", () => {
        test("valid mutation returns right none", () => {
            const controller = new Controller(5);
            expect(controller.parseLine("PLACE 1,2,NORTH")).toStrictEqual(
                E.right(O.none)
            );
        });
        test("invalid mutation returns left error", () => {
            const controller = new Controller(5);
            // invalid as no placement has happened
            expect(controller.parseLine("MOVE")).toStrictEqual(
                E.left([new Error("Robot has not been placed")])
            );
        });
        test("valid query returns right some string", () => {
            const controller = new Controller(5);
            controller.parseLine("PLACE 1,2,NORTH");
            expect(controller.parseLine("REPORT")).toStrictEqual(
                E.right(O.some("1,2,NORTH"))
            );
        });
        test("invalid query returns left error", () => {
            const controller = new Controller(5);
            expect(controller.parseLine("REPORT")).toStrictEqual(
                E.left([new Error("Robot has not been placed")])
            );
        });
        test("valid system action returns right none", () => {
            const mockTerminateExecutor: TerminationActionExecutor = {
                action: Action.EXIT,
                actionType: ActionType.TERMINATION,
                systemProcess: () => E.right(O.none),
            };
            const controller = new Controller(5, () =>
                E.right(mockTerminateExecutor)
            );
            expect(controller.parseLine("EXIT")).toStrictEqual(E.right(O.none));
        });
        test("invalid system action returns right none", () => {
            const mockTerminateExecutor: TerminationActionExecutor = {
                action: Action.EXIT,
                actionType: ActionType.TERMINATION,
                systemProcess: () =>
                    E.left([new Error("This shouldn't happen.")]),
            };
            const controller = new Controller(5, () =>
                E.right(mockTerminateExecutor)
            );
            expect(controller.parseLine("EXIT")).toStrictEqual(
                E.left([new Error("This shouldn't happen.")])
            );
        });
    });
});

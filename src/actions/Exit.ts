import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

import {
    Action,
    ActionType,
    TerminationActionExecutor,
} from "./ActionExecutor";

export const exitExecutor: TerminationActionExecutor = {
    action: Action.EXIT,
    actionType: ActionType.TERMINATION,
    systemProcess: () => {
        process.exit(0);
        return E.right(O.none);
    },
};

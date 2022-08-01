import { Either } from "fp-ts/Either";
import * as E from "fp-ts/Either";

import { ActionExecutor } from "./ActionExecutor";
import { placeExecutor } from "./Place";
import { reportExecutor } from "./Report";
import { moveExecutor } from "./Move";
import { leftExecutor, rightExecutor } from "./Turn";
import { exitExecutor } from "./Exit";

export const actions = [
    placeExecutor,
    moveExecutor,
    leftExecutor,
    rightExecutor,
    reportExecutor,
    exitExecutor,
];

export const parseAction = (line: string): Either<Error[], ActionExecutor> => {
    const command = line.split(/\s/)[0].trim();

    const selectedAction = actions.find((action) => action.action === command);

    if (!selectedAction) {
        return E.left([new Error(`"${line}" is not a valid command.`)]);
    }
    return E.right(selectedAction);
};

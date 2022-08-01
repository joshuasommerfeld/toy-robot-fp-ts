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

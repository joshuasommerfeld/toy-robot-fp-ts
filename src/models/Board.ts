import { PositionDirection } from "./PositionDirection";
import { Option } from "fp-ts/Option";

export interface Board {
    width: number;
    height: number;

    toyRobot: Option<PositionDirection>;
}

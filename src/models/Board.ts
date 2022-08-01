import { Option } from "fp-ts/Option";
import { PositionDirection } from "./PositionDirection";

export interface Board {
    width: number;
    height: number;

    toyRobot: Option<PositionDirection>;
}

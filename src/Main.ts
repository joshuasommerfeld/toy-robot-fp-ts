import readline from "readline";
import { Controller } from "./Controller";
import { map, mapLeft } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { isSome } from "fp-ts/Option";

const commandLineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const controller = new Controller(5);

console.log("Toy robot ready for input");
console.log(`
Valid commands are:
  PLACE X,Y,F - Place the robot
  MOVE - Move the robot forward
  LEFT - Rotate the robot to the left
  RIGHT - Rotate the robot to the right
  REPORT - Report the co-ordinates and direction of the robot
  EXIT - exit
`);

commandLineReader.prompt(true);
commandLineReader.on("line", (line: string) =>
    pipe(
        controller.parseLine(line.toUpperCase()),
        map((right) => {
            if (isSome(right)) {
                console.log(`Output - ${right.value}`);
            }
        }),
        mapLeft((left) => {
            left.map((err) => console.error(`ERROR - ${err.message}`));
        })
    )
);

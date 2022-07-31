import readline from "readline";
import { text } from "./Text";
import { Controller } from "./Controller";
import { map, mapLeft } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { isSome } from "fp-ts/Option";

const { help, startup } = text;

const commandLineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const controller = new Controller(5);

console.log(startup);
console.log(help);

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

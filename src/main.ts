import readline from "readline";
import { text } from "./text";
import { parseLine } from "./controller";
import { isLeft, isRight } from "fp-ts/Either";

const { help, startup } = text;

const commandLineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(startup);
console.log(help);

commandLineReader.prompt(true);
commandLineReader.on("line", (line: string) => {
  const result = parseLine(line);
  if (isRight(result)) {
    process.exit(0);
  }
  if (isLeft(result)) {
    result.left.map((err) => console.error(err.message));
  }
});

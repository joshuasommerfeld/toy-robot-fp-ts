import { Either, right } from "fp-ts/Either";

/**
 * @param line - line read from CLI
 * @returns Either an array of errors, or a boolean.
 *    If the boolean is true, it exits the program, otherwise it continues to prompt
 */
export const parseLine = (line: string): Either<Error[], boolean> => {
  console.log(`you entered ${line}`);
  return right(true);
};

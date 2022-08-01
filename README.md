# Toy Robot with FP-TS

**Authored by Josh Sommerfeld**

Toy robot challenge, build to the specifications in `20_coding_test.md`.
This is an interactive CLI, designed in reference to the spec in [20_coding_test](20_coding_test.md)

This project utilises Typescript and [fp-ts](https://github.com/gcanti/fp-ts).

## Getting Started

If you have docker installed, you can run the program using:
```bash
    docker build -t certsy-toy-robot .
    docker run -it certsy-toy-robot
```

Alternatively you can run it via yarn and nvm:
```bash
    nvm install
    nvm use
    yarn
    yarn start
```

Running the tests
```bash
    nvm install
    nvm use
    yarn
    yarn test
```

## Design Process

Separation of Concerns
1. Startup and Input - Main
2. Message BUS and storage - Controller
    - If we were to adjust to using a file reader, or an API, instead, we could just mount a new entrypoint to Controller.
3. Action parsing and executions - actions
    - 3 types of actions:
        1. Mutation actions for adjusting the state of the board.
        2. Query actions for extracting data on the state of the board for the user.
        3. Termination actions for terminating the interactive session.
4. Data transformations / pure functions - transformations
    - Any re-usable data transformation methods are stored here


## Implementation Plan

1. Dockerised run command
2. Interactive command line session
3. Command line parser
4. Vertical slice of PLACE, REPORT including tests
5. Implement MOVE, RIGHT, LEFT

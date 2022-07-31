# Certsy Toy Robot

**Authored by Josh Sommerfeld**

Toy robot challenge, build to the specifications in `20_coding_test.md`.

This project utilises Typescript and fp-ts for it's functional generic monads.

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

## Design Process

Seperation of concernse
1. Startup and Input - Main
2.

## Implementation Plan

1. Dockerised run command
2. Interactive command line session
3. Command line parser
4. Vertical slice of PLACE, including tests
5. Implement MOVE, RIGHT, LEFT, REPORT

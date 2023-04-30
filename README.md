# Saiphan
Write Github Actions workflows with type-safe confidence and testable

> This project in under development and proof and concept phase.

![](docs/images/saiphan-summary.png)

## How does it work?

- Background
    - TypeScript is imperative language, all variables must be in sequences.
    - GitHub Actions, is declarative, it’s not in sequences
- Problem: Type inference cannot work in compile time, because they need to refer to declarative way
    - Using background process to prepare type for compile time,
    - 3 Main mechanism:
        - Load GitHub Actions open source for getting `input` and `output` props (Support private repo later)
        - Compile → Declarative GitHub Actions to TypeScript  imperative code for run time execution and unit testing
        - Build → Compile to `yaml` file to publish.
        - Note: consider `AST` (Abstract Syntax Tree) for store metadata to convert.
- Next step:
    - How to parse mock data
    - generate unit test from workflow object


## Work Expectable

- Each job should be with unit test by mocking all inputs value from workflows event.
- Type-safe experience for writing the Github Actions Workflows

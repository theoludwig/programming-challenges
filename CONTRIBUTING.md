# 💡 Contributing

Thanks a lot for your interest in contributing to **programming-challenges**! 🎉

## Types of contributions

- [Submit a challenge](#submit-a-challenge)
- [Submit a solution](#submit-a-solution)
- Add support for a new language
- Correct spelling errors, improvements or additions to documentation files (README, CONTRIBUTING...).

## Submit a challenge

You can submit a new challenge by running the command `programming-challenges generate challenge --challenge="<your-challenge-name>" --github-user="<your-github-user>"`

After running this command, a new folder will be created inside the [challenges](./challenges) folder.

You can start editing the `test` folder of the challenge with corresponding `input.txt` and `output.txt` also don't forget to update `README.md` with appropriate exercise statement, to explain what is intended for this challenge.

## Submit a solution

You can submit a new solution by running the command `programming-challenges generate challenge --challenge="<name>" --github-user="<your-github-user>" --language="<your-favorite-language>" --solution="<your-solution>"`.

After running this command, a new folder will be created inside the `solutions` folder of the challenge.

Start writing some code, inside the `solution` file with your favorite programming language, you will get the input thanks to STDIN, and you should output what is intended to STDOUT.

Before submitting the solution, make sure it passes all the tests by running `programming-challenges run test --affected`.

## Pull Requests

- **Please first discuss** the change you wish to make via [issue](https://github.com/Divlo/programming-challenges/issues) before making a change. It might avoid a waste of your time.

- Make sure your **code passes the tests**.

If you're adding new features to **programming-challenges**, please include tests.

## Commits

The commit message guidelines respect [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) and [Semantic Versioning](https://semver.org/) for releases.

### Types

Types define which kind of changes you made to the project.

| Types    | Description                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| feat     | A new feature.                                                                                               |
| fix      | A bug fix.                                                                                                   |
| docs     | Documentation only changes.                                                                                  |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).      |
| refactor | A code change that neither fixes a bug nor adds a feature.                                                   |
| perf     | A code change that improves performance.                                                                     |
| test     | Adding missing tests or correcting existing tests.                                                           |
| build    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).         |
| ci       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs). |
| chore    | Other changes that don't modify src or test files.                                                           |
| revert   | Reverts a previous commit.                                                                                   |

### Scopes

Scopes define what part of the code changed.

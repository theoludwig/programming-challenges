# 💡 Contributing

Thanks a lot for your interest in contributing to **programming-challenges**! 🎉

## Code of Conduct

**programming-challenges** adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on **programming-challenges** happens directly on this repository. Both core team members and external contributors send pull requests which go through the same review process.

## Types of contributions

- [Submit a challenge](#submit-a-challenge)
- [Submit a solution](#submit-a-solution)
- [Add support for a new language](#add-a-programming-language)
- Correct spelling errors, improvements or additions to documentation files (README, CONTRIBUTING...).

## Submit a challenge

You can submit a new challenge by running the command `programming-challenges generate challenge --challenge="<your-challenge-name>" --github-user="<your-github-user>"`

After running this command, a new folder will be created inside the [challenges](./challenges) folder.

You can start editing the `test` folder of the challenge with corresponding `input.txt` and `output.txt` also don't forget to update `README.md` with appropriate exercise statement, to explain what is intended for this challenge.

## Submit a solution

You can submit a new solution by running the command `programming-challenges generate solution --challenge="<name>" --github-user="<your-github-user>" --language="<your-favorite-language>" --solution="<your-solution>"`.

After running this command, a new folder will be created inside the `solutions` folder of the challenge.

Start writing some code, inside the `solution` file with your favorite programming language, you will get the input thanks to STDIN, and you should output what is intended to STDOUT.

Before submitting the solution, make sure it passes all the tests by running `programming-challenges run test --affected`.

## Add a programming language

You can add support for a new language, so you can solve the challenges with even more programming languages!

- First create a new folder inside `templates/docker` with the file extension of the new programming language (e.g: `js`, `cpp`, etc.)
- Inside this new folder create a `Dockerfile`, to compile and execute the solution
- Create a new template inside `templates/solution` folder with the file extension of the new programming language, with the basic boilerplate to read from `stdin` and print to `stdout` the result
- Every programming language should have at least one working solution for `challenges/hello-world`.

    To generate the solution for the `hello-world` challenge with your new language, run the command `programming-challenges generate solution --challenge="hello-world" --github-user="<your-github-user>" --language="<your-new-language>" --solution="function"`

Before submitting the new programming language, make sure it passes all the tests by running `programming-challenges run test --affected`

## Pull Requests

- **Please first discuss** the change you wish to make via [issue](https://github.com/theoludwig/programming-challenges/issues) before making a change. It might avoid a waste of your time.

- Make sure your **code passes the tests**.

If you're adding new features to **programming-challenges**, please include tests.

## Commits

The commit message guidelines adheres to [Conventional Commits](https://www.conventionalcommits.org/).

### Examples

```sh
git commit -m "feat(languages): add C# support"
git commit -m "fix(cli): improve --ci option to `run test` command"
git commit -m "feat(challenges): add `hello-world`"
git commit -m "feat(solutions): add `hello-world/javascript/function`"
git commit -m "docs: fix typo `at` should be `on`"
```

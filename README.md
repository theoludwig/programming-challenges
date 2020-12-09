<h1 align="center">programming-challenges</h1>

<p align="center">
  <strong>Programming exercises and challenges to improve your algorithmic logic.</strong>
</p>

<p align="center">
  <a href="https://gitpod.io/#https://github.com/Divlo/programming-challenges"><img src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod" alt="Gitpod ready-to-code"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/></a>
  <br/> <br/>
  <img src="./.github/logo.png" width="120" alt="programming-challenges Logo" />
</p>

## 📜 About

**programming-challenges** brings together lots of programming exercises and challenges to improve your algorithmic logic.

Each challenge has its **solutions**, its **instructions** and **input/output examples** so you can try to solve them on your own. See [challenges](./challenges) folder.

## ✅ Programming languages available

`npm run test` command will only work with these languages :

- JavaScript and TypeScript (Node.js >= 12)
- Python >= 3.8

## 🚀 Installation & Usage (CLI)

To easily create **new challenges instructions, solutions and test** your code, I made a **CLI tool** made with Node.js and TypeScript.

### Requirements

- Node.js >= 12

Then you need to run `npm install` in the root folder to install needed packages, you can now use one of these commands :

- ### `npm run create-challenge`

  Create the basic files needed for a new challenge. It will ask you some questions and you will be ready to write the instructions and `input-output.json`. Please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md).

- ### `npm run create-solution`

  Create the basic files needed for a new solution for a challenge. It will ask you some questions and you will be ready to write your solution in the available programming languages (see above). If you wish to submit to everyone your solution. Please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md).

- ### `npm run test [challenge-name] [solution-name]`

  Test if the solution is correct and display where it succeeds and fails with the inputs provided, the output of your function and the expected output.

  Example : `npm run test hello-world python-hello`

## 💡 Contributing

Feel free to submit your challenges, your solutions or even a simple spelling mistake.

Everyone can contribute to the improvement of the project! The steps to contribute can be found in the [CONTRIBUTING.md](./.github/CONTRIBUTING.md) file.

## 📄 License

[MIT](./LICENSE)

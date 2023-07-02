<h1 align="center">programming-challenges</h1>

<p align="center">
  <strong>Programming exercises and challenges to improve your algorithmic logic.</strong>
</p>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br />
  <a href="https://github.com/theoludwig/programming-challenges/actions/workflows/cli.yml"><img src="https://github.com/theoludwig/programming-challenges/actions/workflows/cli.yml/badge.svg?branch=master" /></a>
  <a href="https://github.com/theoludwig/programming-challenges/actions/workflows/challenges.yml"><img src="https://github.com/theoludwig/programming-challenges/actions/workflows/challenges.yml/badge.svg?branch=master" /></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <br/>
  <a href="https://gitpod.io/#https://github.com/theoludwig/programming-challenges"><img src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod" alt="Gitpod ready-to-code"/></a>
  <br/> <br/>
  <img src="./logo.png" width="120" alt="programming-challenges Logo" />
</p>

## 📜 About

**programming-challenges** brings together lots of programming exercises and challenges to improve your algorithmic logic.

Each challenge has its **solutions**, its **instructions** and **input/output examples** so you can try to solve them on your own. See [challenges](./challenges) folder.

[Related Blog Post](https://theoludwig.fr/blog/programming-challenges/).

### ✅ Programming languages available

- [C/C++ (gcc)](https://gcc.gnu.org/)
- [C# (Mono)](https://www.mono-project.com/)
- [Dart](https://dart.dev/)
- [Java (OpenJDK)](https://openjdk.java.net/)
- [JavaScript/TypeScript (Node.js)](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Rust](https://www.rust-lang.org/)

## 🚀 Getting Started

### ☁️ Try with a Single-Click

Gitpod will automatically setup an environment for you.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/theoludwig/programming-challenges)

### Locally

#### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.0.0
- [npm](https://npmjs.com/) >= 9.0.0
- [Docker](https://www.docker.com/)

#### Installation

```sh
# Clone the repository
git clone git@github.com:theoludwig/programming-challenges.git

# Go to the project root
cd programming-challenges

# Install dependencies
npm install

# Build the Command Line Interface (CLI)
npm run build

# Install the `programming-challenges` Command Line Interface (CLI)
npm install --global
```

### Usage

```sh
# Discover all the commands availables
programming-challenges --help

# Generate a new challenge
programming-challenges generate challenge --github-user="YourGitHubName" --challenge="hello-world"

# Generate a new solution
programming-challenges generate solution --github-user="YourGitHubName" --challenge="hello-world" --solution="function" --language="python"

# Test a solution
programming-challenges run test --challenge="hello-world" --solution="function" --language="python"

# Run a solution with specific `input.txt` file
programming-challenges run solution --challenge="hello-world" --solution="function" --language="python" --input-path="./challenges/hello-world/test/1/input.txt" --output
```

## 💡 Contributing

Anyone can help to improve the project, submit a challenge, a solution or even correct a simple spelling mistake.

The steps to contribute can be found in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## 📄 License

[MIT](./LICENSE)

# 💡 Contributing

## Types of contributions :

- [Submit a challenge instructions](challenge-instructions)
- [Share a solution for an already existing challenge](solution-for-an-already-existing-challenge)
- [Add a language available for testing the code](language-available-for-testing-the-code) 
- [Correct a spelling error](spelling-error)

## Challenge instructions

After running the command `npm run create-challenge` (see Installation & Usage part of [README.md](../README.md)).

You should have a new folder called the name of your challenge in [challenges](./challenges) folder.

### Structure and purpose of each files :

- `README.md` : explain what the solution function should do (the instructions).
- `input-output.json` : An array of possible input/output. This file allows you to test solutions.

    Example of file :
    ```json 
    [
        {
            "input": ["arg"],
            "output": "Hello world arg!"
        },
        {
            "input": ["Divlo"],
            "output": "Hello world Divlo!"
        }
    ]
    ```
    Each object has a "input" key, an array where each item is an argument passed to the solution function when it's executed. The "output" key is the expected output with the given input.
- `solutions` folder where there are all solutions for this specific challenge.

## Solution for an already existing challenge

After running the command `npm run create-solution` (see Installation & Usage part of [README.md](../README.md)).

You should have a new folder called the name of your solution in the challenge folder then you can write your solution in the solution file.
You need to name your parameters of the function (see the instruction of the challenge).

When you feel it's right, you would need to test your code against `input-output.json` file to see if it's a valid solution..
Run this command `npm run test [challenge-name] [solution-name]`.

## Language available for testing the code

Before to add a new language, you should understand :

[/scripts/languages-wrapper](../scripts/languages-wrapper) folder contains all the files needed to execute solutions. Each programming challenge has a execute file, this execute file will be copied in the `temp` folder with the solution file.

Steps to add a new language : 

1. Code the execute file in the appropriate language

    Algorithm of the execute file : 

    - Import the solution function (same  directory, ignore errors)
    - Read the `./input.json` files and convert it as JSON (not plain text string)
    - Execute the solution function imported with the inputs as arguments
    - Create and write a new file called `./output.json`, with the output result of the solution function

    Example in javascript with node.js ([execute.js](../scripts/languages-wrapper/execute.js)) : 
    ```javascript 
    const path = require('path')
    const fs = require('fs').promises
    const solution = require('./solution')

    const inputPath = path.join(__dirname, 'input.json')
    const outputPath = path.join(__dirname, 'output.json')

    const main = async () => {
        const inputFile = await fs.readFile(inputPath)
        const inputJSON = JSON.parse(inputFile)

        const result = solution.apply(null, inputJSON)
        await fs.writeFile(outputPath, JSON.stringify(result))
    }

    main()
    ```

1. Add the language in the `_languages.json` file as a new object of the array. Example for JavaScript : 
    ```json 
    {
        "name": "JavaScript",
        "extension": ".js",
        "launch": "node"
    }
    ```
1. Create a new solution file with the default basic boilerplate code in `/scripts/languages-wrapper/templates`. Example : `solution.js`:
    ```js
    function solution () {
    
    }

    module.exports = solution
    ```
1. Add the language in the language available in [README.md](../README.md) file.



## Spelling error

Correct spelling errors, in the README or CONTRIBUTING files.

Thank you for your support!

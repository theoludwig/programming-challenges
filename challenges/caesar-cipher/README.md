# caesar-cipher

Created by [@Divlo](https://github.com/Divlo) on 21 October 2020.

## Instructions

In cryptography, a **Caesar cipher**, also known as **Caesar's cipher**, the **shift cipher**, **Caesar's code** or **Caesar shift**, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.

### Example of the alphabet with a rotation by 3

```txt
Original alphabet   : ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet rotated +3 : DEFGHIJKLMNOPQRSTUVWXYZABC
```

Complete the solution function. It should return the encrypted string.

The function has the following JSON object in argument :

- `string`: a string in cleartext (everything uppercase)
- `shift`: an integer, the alphabet rotation factor

## Source

- [Wikipedia - Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

## Examples

See the `input-output.json` file for examples of input/output.

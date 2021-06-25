# caesar-cipher

Created by [@Divlo](https://github.com/Divlo) on 25 June 2021.

## Instructions

In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of -3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.

### Example of the alphabet with a shift of +3 (shift to the right)

```text
Alphabet original   : ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet rotated +3 : DEFGHIJKLMNOPQRSTUVWXYZABC
```

Create a function that will return the sentence after shifting the alphabet.

- If it is a **positive** number then we shift the alphabet to the **right**
- If it is a **negative** number then we shift the alphabet to the **left**

### Example of Inputs

```py
'ANTHONY' # a character string (all capital letters)
'-2' # an integer, the shift in the alphabet
```

## Source

- [Wikipedia - Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

## Examples

See the `test` folder for examples of input/output.

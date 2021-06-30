# roman-numerals

Created by [@Divlo](https://github.com/Divlo) on 30 June 2021.

## Instructions

The objective of this challenge is to create a function that translates a number into Roman numerals or the other way around.

We will use the letters `I`, `V`, `X`, `L`, `C`, `D`, `M` to build the Roman numerals.

Here are the rules for building a Roman numeral:

- The numbers `1`, `2` and `3` are written respectively as `I`, `II` and `III`
- The number `5` is written as `V`
- The number `10` is written as `X`
- The number `50` is written as `L`
- The number `100` is written as `C`
- The number `500` is written as `D`
- The number `1000` is written as `M`
- When writing two letters in a row, if the numerical value of the first is greater than the numerical value of the second, their numerical values ​​are added. For example the number `6` is written `VI`. We add `V` (5) + `I` (1) = 6.
- When writing two letters in a row, if the numerical value of the first is less than the numerical value of the second, the value of the first is subtracted from the second. For example the number `4` is written `IV`. We subtract `V` (5) - `I` (1) = 4.
- Subtractions of values ​​are limited to 2 letters only. For example we **cannot** write `8` while doing `IIX`. We must use the addition of letters like this `VIII`.
- Therefore, the first ten numbers are written as `I`, `II`, `III`, `IV`, `V`, `VI`, `VII`, `VIII`, `IX`, `X` . Larger numbers follow the same pattern.
- You can associate as many symbols as you want to write larger numbers, for example:
  - `36` is written as `XXXVI`
  - `42` is written as `XLII`
  - `2448` is written as `MMCDXLVIII`.

| Symbol | I | V | X  | L  | C   | D   | M    |
|--------|---|---|----|----|-----|-----|------|
| Value  | 1 | 5 | 10 | 50 | 100 | 500 | 1000 |

### Input

- **Line 1:** The string : `arabic to roman` or `roman to arabic` to determine how to convert the number
- **Line 2:** The number to convert

## Source

- [Wikipedia - Roman numerals](https://en.wikipedia.org/wiki/Roman_numerals)
- [Wikipedia - Arabic numerals](https://en.wikipedia.org/wiki/Arabic_numerals)

## Examples

See the `test` folder for examples of input/output.

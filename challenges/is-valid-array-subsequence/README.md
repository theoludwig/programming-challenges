# is-valid-array-subsequence

Created by [@Divlo](https://github.com/Divlo) on 23 April 2022.

## Instructions

Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one.

A subsequence of an array is a set of numbers that aren't necessarily adjacent in the array but that are in the same order as they appear in the array. For instance, the numbers `[1, 3, 4]` form a subsequence of the array `[1, 2, 3, 4]`, and so do the numbers `[2, 4]`. Note that a single number in an array and the array itself are both valid subsequences of the array.

### Input

- **Line 1:** `array` Integers separated by spaces
- **Line 2:** `sequence` Integers separated by spaces

### Output

The output should return `true` if the `sequence` is a subsequence of `array` and `false` otherwise.

## Examples

See the `test` folder for examples of input/output.

### Example 1

#### Input

```txt
5 1 22 25 6 -1 8 10
1 6 -1 10
```

#### Output

```txt
true
```

### Example 2

#### Input

```txt
5 1 22 25 6 -1 8 10
5 1 22 25 6 -1 8 10 12
```

#### Output

```txt
false
```

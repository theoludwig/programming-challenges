# convert-number-from-base-to-another

Created by [@theoludwig](https://github.com/theoludwig) on 20 October 2021.

## Instructions

Convert a natural number (`number`) from a certain base (`base_from`) to another base (`base_target`).

For bases up to and including 10, we use the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9.

For bases between 11 and 36, we use the 10 digits then the letters (capitals). For example, for base 16, the symbols used are 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F. For base 36, we uses the symbols 0,1,2,3,4,5,6,7,8,9, A, B, C, D, E, F, G, H, I, J, K, L, M, N , O, P, Q, R, S, T, U, V, W, X, Y, Z.

### Input

- **Line 1:** The `number` to be converted (natural number)
- **Line 2:** The base of the number `base_from`
- **Line 3:** The base to convert to `base_target`

### Output

The converted number.

## Examples

### Example 1

#### Input

```txt
15
10
16
```

#### Output

```txt
F
```

### Example 2

#### Input

```txt
100000000
2
16
```

#### Output

```txt
100
```

See the `test` folder for examples of input/output.

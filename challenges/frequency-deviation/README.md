# frequency-deviation

Created by [@theoludwig](https://github.com/theoludwig) on 16 September 2023.

## Instructions

Given a string consisting of lowercase English letters, we define the frequency deviation of a substring as the difference between the maximum and the minimum frequencies of the characters in that substring.

A substring of a string is formed by any contiguous segment of the string. For example, given "bbacccc", the character appearing most frequently is 'c' with $4$ occurrences. The character that appears the fewest times is 'a' with $1$ occurrence. The frequency deviation of the entire string is $4 - 1 = 3$.

Given a string, $s$, representing the input string, find the maximum possible frequency deviation of any of its substrings.

### Constraints

- $$1 \leq s.length \leq 10^4$$
- $s$ consists of lowercase English letters.

## Source

- [LeetCode - Substring With Largest Variance](https://leetcode.com/problems/substring-with-largest-variance/)
- [Twitter @CoderNolimit](https://twitter.com/CoderNolimit/status/1668147202173050881)

## Examples

See the `test` folder for examples of input/output.

### Example 1

#### Input

```txt
bbacccc
```

#### Output

```txt
3
```

### Example 2

#### Input

```txt
aabb
```

#### Output

```txt
1
```

### Example 3

#### Input

```txt
aaaaa
```

#### Output

```txt
0
```

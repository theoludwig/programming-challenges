# maximum-subarray-sum

Created by [@Divlo](https://github.com/Divlo) on 1 May 2022.

## Instructions

Given an array of `n` integers, find the contiguous subarray with the largest sum.

Contiguous subarray is any sub series of elements in a given array that are contiguous ie their indices are continuous. The problem is interesting when there may be negative values in the array, because if the array only contains positive values, the maximum subarray sum is basically the sum of the array (the subarray being the complete array).

## Input

- **Line 1:** An integer `n` for the length of the list of integers
- **`n` next lines:** the integers

## Output

The largest sum of a contiguous subarray.

## Examples

See the `test` folder for examples of input/output.

### Example 1

#### Input

```txt
6
1
2
3
4
5
6
```

#### Output

```txt
21
```

**Explanation:** The subarray with the largest sum is the array itself (as there is no negative values) `[1, 2, 3, 4, 5, 6]` which has a sum of `21`.

### Example 2

#### Input

```txt
8
-1
2
4
-3
5
2
-5
2
```

#### Output

```txt
10
```

**Explanation:** The subarray with the largest sum is `[2, 4, -3, 5, 2]` which has a sum of `10`.

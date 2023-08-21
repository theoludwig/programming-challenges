# look-and-say-sequence-conway

Created by [@theoludwig](https://github.com/theoludwig) on 30 November 2021.

## Instructions

In mathematics, the **look-and-say sequence** is the sequence of integers beginning as follows: `1, 11, 21, 1211, 111221, 312211, 13112221, 1113213211, ...`.

The look-and-say sequence was introduced and analyzed by John **Conway**.

To generate a member of the sequence from the previous member, read off the digits of the previous member, counting the number of digits in groups of the same digit. For example:

- `1` is read off as "one 1" or 11.
- `11` is read off as "two 1s" or 21.
- `21` is read off as "one 2, then one 1" or 1211.
- `1211` is read off as "one 1, one 2, then two 1s" or 111221.
- `111221` is read off as "three 1s, two 2s, then one 1" or 312211.

Write a program that prints the next term of the **look-and-say sequence**.

## Source

[Look-and-say sequence - Wikipedia](https://en.wikipedia.org/wiki/Look-and-say_sequence)

## Examples

### Example 1

#### Input

```txt
11
```

#### Output

```txt
21
```

### Example 2

#### Input

```txt
1211
```

#### Output

```txt
111221
```

See the `test` folder for examples of input/output.

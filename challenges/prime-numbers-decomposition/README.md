# prime-numbers-decomposition

Created by [@theoludwig](https://github.com/theoludwig) on 16 October 2021.

## Instructions

## Definition

In mathematics, product decomposition of prime factors (also known as integer factorization into prime numbers) involves writing a strictly positive integer as a product of prime numbers.

This factorization is unique and exists for all numbers and has many applications, particularly in RSA cryptography.

**Note :** A prime number is a natural integer which admits exactly two distinct positive divisors. (1 and itself). Example: 2, 3, 5, 7, 11, 13, 17, 19...

## How to decompose a number into a product of factors of prime numbers?

To find the product decomposition of prime factors of a number `N`, there is no mathematical formula. To achieve this, there are algorithms, the most basic of which attempts to divide the number `N` by the set of prime factors `p` which are less than `N`.
If `p` is a divisor of `N` then start again by taking a new `N = N / p` as long as there are possible prime divisors.

## Examples

### Example

#### Input

```txt
32
```

#### Output

```txt
2 * 2 * 2 * 2 * 2
```

See the `test` folder for examples of input/output.

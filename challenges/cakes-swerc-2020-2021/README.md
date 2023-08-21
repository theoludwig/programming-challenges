# cakes-swerc-2020-2021

Created by [@theoludwig](https://github.com/theoludwig) on 23 April 2022.

## Instructions

This summer, you plan to organize a large party and invite many
friends. They have a sweet tooth, so you plan to bake nice cakes for them.
You know the recipe for a nice chocolate cake, and you want to cook as
many of them as possible.

Given the `N` ingredients needed to make a single cake and the
ingredients that you have in your kitchen, how many cakes can you
make?

### Input

- **Line 1:** Single integer `N` for the number of ingredients.
- **`N` next lines:** One for each ingredient. Each of these lines contains two positive integers:
the first one is the required quantity of this ingredient per cake, the second one is the quantity of
this ingredient you have in your kitchen.

### Output

The output should contain a single integer: the maximum number of cakes you can make using the
available ingredients.

### Constraints

- $$1 <= N <= 10$$
- All ingredient quantities will be integers between 1 and 10 000.

## Source

[SWERC 2020–2021 - Problem E: Cake](https://swerc.eu/2020/problems/)

## Examples

See the `test` folder for examples of input/output.

### Example 1

#### Input

```txt
3
100 500
2 5
70 1000
```

#### Output

```txt
2
```

### Example 2

#### Input

```txt
3
100 50
2 5
70 1000
```

#### Output

```txt
0
```

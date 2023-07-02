# slugify

Created by [@theoludwig](https://github.com/theoludwig) on 10 November 2021.

## Instructions

Write a function that generates a slug from a string.

A Slug is the unique identifying part of a web address, typically at the end of the URL.

The rules for generating a slug are as follows (`kebab-case`):

- Replace spaces with hyphens.
- Remove all non-alphanumeric characters.

## Examples

### Example 1

#### Input

```txt
hello world
```

#### Output

```txt
hello-world
```

### Example 2

#### Input

```txt
--hello world--
```

### Output

```txt
hello-world
```

### Example 3

#### Input

```txt
😄 emoji
```

### Output

```txt
emoji
```

See the `test` folder for examples of input/output.

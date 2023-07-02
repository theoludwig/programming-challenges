# prefix-suffix

Created by [@theoludwig](https://github.com/theoludwig) on 2 December 2021.

## Instructions

A prefix is an affix which is placed before the stem of a word. Adding it to the beginning of one word changes it into another word. For example, when the prefix un- is added to the word happy, it creates the word unhappy.

A suffix is an affix which is placed after the stem of a word. Common examples are case endings, which indicate the grammatical case of nouns, adjectives, and verb endings, which form the conjugation of verbs. Suffixes can carry grammatical information or lexical information.

Write a programs that takes 2 strings ("words") and prints if one is a prefix/suffix of the other.

### Input

- **Line 1:** The word to be checked
- **Line 2:** The potential prefix/suffix

### Output

- **Line 1:** `true` if the second word is a **prefix** of the first, `false` otherwise
- **Line 1:** `true` if the second word is a **suffix** of the first, `false` otherwise

## Source

- [Wikipedia - Prefix](https://en.wikipedia.org/wiki/Prefix)
- [Wikipedia - Suffix](https://en.wikipedia.org/wiki/Suffix)

## Examples

### Example 1

#### Input

```txt
Py
AlgoPy
```

#### Output

```txt
false
false
```

### Example 2

#### Input

```txt
AlgoPy
Py
```

#### Output

```txt
false
true
```

### Example 3

#### Input

```txt
same-word
same-word
```

#### Output

```txt
true
true
```

See the `test` folder for examples of input/output.

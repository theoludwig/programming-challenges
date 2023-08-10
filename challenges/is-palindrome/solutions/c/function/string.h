#ifndef __STRING__
#define __STRING__

#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

/**
 * @brief Return the length of a string (excluding '\0').
 *
 * @param string
 * @return size_t
 */
size_t string_get_length(const char* string);

/**
 * @brief Converts all the alphabetic characters in a string to uppercase.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_to_uppercase(char* string);

/**
 * @brief Removes all the occurrences of a character in a string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 * @param search A character search value.
 */
void string_remove_character(char* string, char search);

/**
 * @brief Reverse the characters in a string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_reverse(char* string);

/**
 * @brief Return the copy of a string.
 *
 * @param string
 * @return char*
 */
char* string_copy(const char* string);

/**
 * @brief Returns true if the string is a palindrome (a palindrome is a word,
 * number, phrase, or other sequence of characters which reads the same backward
 * as forward).
 *
 * @param string The string to check.
 * @return true if the string is a palindrome, false otherwise.
 */
bool string_is_palindrome(char* string);

#endif

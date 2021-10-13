#ifndef __STRING__
#define __STRING__

#include <stdbool.h>

/**
 * @brief Converts all the alphabetic characters in a string to uppercase.
 *
 * @param string
 * @return char*
 */
char* string_to_upper(const char* string);

/**
 * @brief Reverse the characters in an array.
 *
 * @param string
 * @return char*
 */
char* string_reverse(const char* string);

/**
 * @brief Returns true if the string is a palindrome (a palindrome is a word,
 * number, phrase, or other sequence of characters which reads the same backward
 * as forward).
 *
 * @param string The string to check.
 * @return true if the string is a palindrome, false otherwise.
 */
bool string_is_palindrome(const char* string);

/**
 * @brief Replace all the occurrences of search value into replace value in
 * the string.
 *
 * @param string
 * @param search_value A character search value.
 * @param replace_value A character containing the text to replace for match.
 * @return char*
 */
char* string_replace(const char* string, char search, char replace);

#endif

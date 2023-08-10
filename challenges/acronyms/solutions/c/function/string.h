#ifndef __STRING__
#define __STRING__

#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * @brief Return the length of a string (excluding '\0').
 *
 * @param string
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
 * @brief Converts a string to its acronym.
 *
 * @param string
 * @return char*
 */
char* string_acronym(char* string);

#endif

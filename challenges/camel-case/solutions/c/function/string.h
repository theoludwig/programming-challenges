#ifndef __STRING__
#define __STRING__

#include <stdbool.h>
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
 * @brief Removes all `character` from the start of a string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_trim_start(char* string, char character);

/**
 * @brief Removes all `character` from the end of a string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_trim_end(char* string, char character);

/**
 * @brief Removes all `character` from the start and end of a string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_trim(char* string, char character);

/**
 * @brief Converts a string to camel case.
 *
 * @param string
 * @return char*
 */
char* string_camelCase(char* string);

/**
 * @brief Capitalizes the string.
 *
 * NOTE: Mutates the string.
 *
 * @param string
 */
void string_capitalize(char* string);

#endif

#ifndef __CHARACTER__
#define __CHARACTER__

#include <errno.h>
#include <stdbool.h>
#include <stdlib.h>

#include "string.h"

/**
 * @brief Append a character to a string, assuming string points to an array
 * with enough space.
 *
 * @param string
 * @param character
 */
void character_append(char* string, char character);

/**
 * @brief Append a character to a string at a specific index, assuming string points to an array with enough space.
 *
 * @param string
 * @param character
 * @param index
 */
void character_append_at(char* string, const char character, const size_t index);

/**
 * @brief Converts the character to uppercase.
 *
 * @param character
 */
char character_to_upper(const char character);

#endif

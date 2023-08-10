#ifndef __CHARACTER__
#define __CHARACTER__

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

/**
 * @brief Append a character to a string, assuming string points to an array
 * with enough space.
 *
 * @param string
 * @param character
 */
void character_append(char* string, char character);

/**
 * @brief Converts the character to lowercase.
 *
 * @param character
 * @return char
 */
char character_to_lower(char character);

/**
 * @brief Checks if the character is alphanumeric.
 *
 * @param character
 * @return bool
 */
bool character_is_alphanumeric(char character);

#endif

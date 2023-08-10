#ifndef __CHARACTER__
#define __CHARACTER__

#include <stdlib.h>
#include <string.h>

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

#endif

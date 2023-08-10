#ifndef __STRING__
#define __STRING__

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

/**
 * @brief Returns true if the string is a prefix of another string.
 *
 * @param string
 * @param prefix
 * @return true
 * @return false
 */
bool string_starts_with(char* string, char* prefix);

/**
 * @brief Returns true if the string is a suffix of another string.
 *
 * @param string
 * @param suffix
 * @return true
 * @return false
 */
bool string_ends_with(char* string, char* suffix);

#endif

#ifndef __STRING__
#define __STRING__

#include <stdlib.h>

/**
 * @brief Returns the total number of occurrences of the given character in the string.
 *
 * @param string
 * @param character
 * @return size_t
 */
size_t string_total_occurrences_of_character(char* string, char character);

/**
 * @brief Returns the first non-repeating character in the given string.
 *
 * @param string
 * @return char*
 */
char string_first_non_repeating_character(char* string);

#endif

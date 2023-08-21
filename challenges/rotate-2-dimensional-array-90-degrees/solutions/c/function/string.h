#ifndef __STRING__
#define __STRING__

#include <errno.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * @brief Return the length of a string (excluding '\0').
 *
 * @param string
 * @return size_t
 */
size_t string_get_length(const char* string);

/**
 * @brief Return the copy of a string.
 *
 * @param string
 * @return string_t
 */
char* string_copy(const char* string);

/**
 * @brief Split a string into substrings using the specified separator and return them as an array and update the pointer `result_size` to the resulting size of the created array.
 *
 * @param string
 * @param separator
 * @param result_size
 * @return string_t*
 */
char** string_split(const char* string, char separator, size_t* result_size);

#endif

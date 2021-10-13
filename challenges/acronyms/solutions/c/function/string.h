#ifndef __STRING__
#define __STRING__

/**
 * @brief Converts all the alphabetic characters in a string to uppercase.
 *
 * @param string
 * @return char*
 */
char* string_to_upper(const char* string);

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

/**
 * @brief Converts a string to its acronym.
 *
 * @param string
 * @return char*
 */
char* string_acronym(char* string);

#endif

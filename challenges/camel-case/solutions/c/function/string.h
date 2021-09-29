#ifndef STRING_H
#define STRING_H

/**
 * @brief Removes all whitespace from the start of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim_start(char* string);

/**
 * @brief Removes all whitespace from the end of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim_end(char* string);

/**
 * @brief Removes all whitespace from the start and end of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim(char* string);

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
 * @param string
 * @return char*
 */
char* string_capitalize(char* string);

#endif

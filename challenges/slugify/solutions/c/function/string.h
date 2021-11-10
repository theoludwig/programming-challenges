#ifndef __STRING__
#define __STRING__

/**
 * @brief Removes all `character` from the start of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim_start(char* string, char character);

/**
 * @brief Removes all `character` from the end of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim_end(char* string, char character);

/**
 * @brief Removes all `character` from the start and end of a string.
 *
 * @param string
 * @return char*
 */
char* string_trim(char* string, char character);

/**
 * @brief Converts all the alphabetic characters in a string to lowercase.
 *
 * @param string
 * @return char*
 */
char* string_to_lowercase(char* string);

/**
 * @brief Generate a slug from a string.
 *
 * @param string
 * @return char*
 */
char* string_slugify(char* string);

#endif

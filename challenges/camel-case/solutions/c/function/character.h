#ifndef __CHARACTER__
#define __CHARACTER__

/**
 * @brief Append a character to a string, assuming string points to an array
 * with enough space.
 *
 * @param string
 * @param character
 */
void character_append(char* string, char character);

/**
 * @brief Converts the character to uppercase.
 *
 * @param character
 * @return char
 */
char character_to_upper(char character);

#endif

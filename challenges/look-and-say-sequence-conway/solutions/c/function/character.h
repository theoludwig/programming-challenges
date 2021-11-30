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
 * @brief Append many characters to a string, assuming string points to an array
 * with enough space.
 *
 * @param string
 * @param characters
 */
void character_append_many(char* string, char* characters);

#endif

#ifndef __STRING__
#define __STRING__

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#define ALPHABET_LENGTH 26
#define ALPHABET "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

/**
 * @brief Return the length of a string (excluding '\0').
 *
 * @param string
 */
size_t string_get_length(const char* string);

/**
 * @brief Shift the alphabet by a given amount.
 *
 * @param shift
 * @return char*
 */
char* string_shift_alphabet(int shift);

/**
 * @brief Encrypts a string using the Caesar cipher.
 *
 * @param string
 * @param shift
 * @return char*
 */
char* string_caesar_cipher(char* string, int shift);

#endif

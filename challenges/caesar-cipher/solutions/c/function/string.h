#ifndef STRING_H
#define STRING_H

#define ALPHABET "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

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

#include "string.h"

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

#define ALPHABET_LENGTH 26

char* string_shift_alphabet(int shift) {
  char* result = malloc(sizeof(char) * (ALPHABET_LENGTH + 1));
  for (char index = 0; index < ALPHABET_LENGTH; index++) {
    char letter = 'A' + index + shift;
    if (letter < 'A') {
      letter = 'Z' + shift + index + 1;
    } else if (letter > 'Z') {
      letter = letter - ALPHABET_LENGTH;
    }
    character_append(result, letter);
  }
  return result;
}

char* string_caesar_cipher(char* string, int shift) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  char* shifted_alphabet = string_shift_alphabet(shift);
  for (size_t index = 0; index < string_length; index++) {
    char letter = string[index];
    if (letter != ' ') {
      for (int index_alphabet = 0; index_alphabet < ALPHABET_LENGTH; index_alphabet++) {
        char current_letter = 'A' + index_alphabet;
        if (string[index] == current_letter) {
          letter = shifted_alphabet[index_alphabet];
          break;
        }
      }
    }
    character_append(result, letter);
  }
  return result;
}

#include "string.h"

#include "character.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

char* string_shift_alphabet(int shift) {
  char* result = malloc(sizeof(char) * (ALPHABET_LENGTH + 1));
  for (size_t index = 0; index < ALPHABET_LENGTH; index++) {
    char letter = 'A' + index + shift;
    if (letter < 'A') {
      letter = 'Z' + shift + index + 1;
    } else if (letter > 'Z') {
      letter = letter - ALPHABET_LENGTH;
    }
    result[index] = letter;
  }
  result[ALPHABET_LENGTH] = '\0';
  return result;
}

char* string_caesar_cipher(char* string, int shift) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  char* shifted_alphabet = string_shift_alphabet(shift);
  for (size_t index = 0; index < string_length; index++) {
    char letter = string[index];
    if (letter != ' ' && (letter >= 'A' && letter <= 'Z')) {
      for (size_t index_alphabet = 0; index_alphabet < ALPHABET_LENGTH; index_alphabet++) {
        char current_letter = 'A' + index_alphabet;
        if (string[index] == current_letter) {
          letter = shifted_alphabet[index_alphabet];
          break;
        }
      }
    }
    result[index] = letter;
  }
  result[string_length] = '\0';
  free(shifted_alphabet);
  return result;
}

#include "character.h"

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

char character_to_lower(char character) {
  char ascii_a = 'a';
  char ascii_A = 'A';
  char ascii_Z = 'Z';
  if (character >= ascii_A && character <= ascii_Z) {
    return character + (ascii_a - ascii_A);
  }
  return character;
}

bool character_is_alphanumeric(char character) {
  char ascii_a = 'a';
  char ascii_A = 'A';
  char ascii_z = 'z';
  char ascii_Z = 'Z';
  char ascii_0 = '0';
  char ascii_9 = '9';
  bool is_lowercase_letter = character >= ascii_a && character <= ascii_z;
  bool is_uppercase_letter = character >= ascii_A && character <= ascii_Z;
  bool is_digit = character >= ascii_0 && character <= ascii_9;
  return is_lowercase_letter || is_uppercase_letter || is_digit;
}

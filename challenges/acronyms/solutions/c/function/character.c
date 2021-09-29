#include "character.h"

#include <stdlib.h>
#include <string.h>

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

const char character_to_upper(const char character) {
  char ascii_a = 'a';
  char ascii_A = 'A';
  char ascii_z = 'z';
  if (character >= ascii_a && character <= ascii_z) {
    return character + (ascii_A - ascii_a);
  }
  return character;
}

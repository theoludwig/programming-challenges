#include "character.h"

#include <stdlib.h>
#include <string.h>

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

const char character_to_upper(const char character) {
  int a_ascii_code = (int)'a';
  int z_ascii_code = (int)'z';
  if (character >= a_ascii_code && character <= z_ascii_code) {
    return character - 32;
  }
  return character;
}

#include "character.h"

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

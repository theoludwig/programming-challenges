#include "character.h"

void character_append(char* string, char character) {
  size_t length = strlen(string);
  string[length] = character;
  string[length + 1] = '\0';
}

void character_append_many(char* string, char* characters) {
  size_t characters_length = strlen(characters);
  for (size_t index = 0; index < characters_length; index++) {
    character_append(string, characters[index]);
  }
}

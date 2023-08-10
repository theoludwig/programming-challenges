#include "character.h"

void character_append(char* string, const char character) {
  size_t length = string_get_length(string);
  character_append_at(string, character, length);
}

void character_append_at(char* string, const char character, const size_t index) {
  size_t length = string_get_length(string);
  for (size_t index_string = length; index_string > index; index_string--) {
    string[index_string] = string[index_string - 1];
  }
  string[index] = character;
  string[length + 1] = '\0';
}

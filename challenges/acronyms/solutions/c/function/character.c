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

char character_to_upper(char character) {
  char ascii_a = 'a';
  char ascii_A = 'A';
  char ascii_z = 'z';
  if (character >= ascii_a && character <= ascii_z) {
    return character + (ascii_A - ascii_a);
  }
  return character;
}

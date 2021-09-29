#include "string.h"

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

char* string_to_upper(const char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    character_append(result, character_to_upper(string[index]));
  }
  return result;
}

char* string_replace(const char* string, char search, char replace) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    bool is_search_value = search == string[index];
    if (is_search_value) {
      character_append(result, replace);
    } else {
      character_append(result, string[index]);
    }
  }
  return result;
}

char* string_acronym(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  char* current = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == ' ') {
      character_append(result, current[0]);
      memset(current, 0, sizeof(char) * (string_length + 1));
    } else {
      character_append(current, string[index]);
    }
  }
  character_append(result, current[0]);
  free(current);
  return result;
}

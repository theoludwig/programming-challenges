#include "string.h"

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

char* string_trim_start(char* string, char character) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  size_t index_space = 0;
  while (string[index_space] == character) {
    index_space++;
  }
  for (size_t index = index_space; index < string_length; index++) {
    character_append(result, string[index]);
  }
  return result;
}

char* string_trim_end(char* string, char character) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  size_t index_space = string_length - 1;
  while (string[index_space] == character) {
    index_space--;
  }
  for (size_t index = 0; index < index_space + 1; index++) {
    character_append(result, string[index]);
  }
  return result;
}

char* string_trim(char* string, char character) {
  char* result = string_trim_start(string, character);
  result = string_trim_end(result, character);
  return result;
}

char* string_to_lowercase(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    character_append(result, character_to_lower(string[index]));
  }
  return result;
}

char* string_slugify(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  int words = 0;
  char* current = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == ' ' || (string[index] == '-' && strlen(current) > 0)) {
      strcat(result, current);
      character_append(result, '-');
      memset(current, 0, sizeof(char) * (string_length + 1));
      words++;
    } else {
      if (character_is_alphanumeric(string[index])) {
        character_append(current, string[index]);
      }
    }
  }
  strcat(result, current);
  free(current);
  return result;
}

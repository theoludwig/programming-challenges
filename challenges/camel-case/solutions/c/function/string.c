#include "string.h"

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

char* string_trim_start(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  size_t index_space = 0;
  while (string[index_space] == ' ') {
    index_space++;
  }
  for (size_t index = index_space; index < string_length; index++) {
    character_append(result, string[index]);
  }
  return result;
}

char* string_trim_end(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  size_t index_space = string_length - 1;
  while (string[index_space] == ' ') {
    index_space--;
  }
  for (size_t index = 0; index < index_space + 1; index++) {
    character_append(result, string[index]);
  }
  return result;
}

char* string_trim(char* string) {
  char* result = string_trim_start(string);
  result = string_trim_end(result);
  return result;
}

char* string_capitalize(char* string) {
  size_t string_length = strlen(string);
  if (string_length > 0) {
    string[0] = character_to_upper(string[0]);
  }
  return string;
}

char* string_camelCase(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  int words = 0;
  char* current = malloc(sizeof(char) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == ' ') {
      strcat(result, words == 0 ? current : string_capitalize(current));
      memset(current, 0, sizeof(char) * (string_length + 1));
      words++;
    } else {
      character_append(current, string[index]);
    }
  }
  strcat(result, words == 0 ? current : string_capitalize(current));
  free(current);
  return result;
}

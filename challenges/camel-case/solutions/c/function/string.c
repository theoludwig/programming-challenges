#include "string.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

void string_trim_start(char* string, char character) {
  size_t string_length = string_get_length(string);
  size_t index_space = 0;
  while (string[index_space] == character) {
    index_space++;
  }
  for (size_t index = 0; index < string_length - index_space; index++) {
    string[index] = string[index + index_space];
  }
  string[string_length - index_space] = '\0';
}

void string_trim_end(char* string, char character) {
  size_t string_length = string_get_length(string);
  size_t index_space = string_length - 1;
  while (string[index_space] == character) {
    index_space--;
  }
  string[index_space + 1] = '\0';
}

void string_trim(char* string, char character) {
  string_trim_start(string, character);
  string_trim_end(string, character);
}

void string_capitalize(char* string) {
  size_t string_length = string_get_length(string);
  if (string_length == 0) {
    return;
  }
  string[0] = character_to_upper(string[0]);
}

char* string_camelCase(char* string) {
  size_t string_length = string_get_length(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  result[0] = '\0';
  size_t words = 0;
  char* current = malloc(sizeof(char) * (string_length + 1));
  size_t current_index = 0;
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == ' ') {
      current[current_index] = '\0';
      if (words > 0) {
        string_capitalize(current);
      }
      strcat(result, current);
      memset(current, 0, sizeof(char) * (string_length + 1));
      current_index = 0;
      words += 1;
    } else {
      current[current_index] = string[index];
      current_index += 1;
    }
  }
  if (words > 0) {
    string_capitalize(current);
    strcat(result, current);
  }
  free(current);
  return result;
}

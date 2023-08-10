#include "string.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

void string_to_lowercase(char* string) {
  size_t string_length = string_get_length(string);
  for (size_t index = 0; index < string_length; index++) {
    string[index] = character_to_lower(string[index]);
  }
  string[string_length] = '\0';
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

char* string_slugify(char* string) {
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  result[0] = '\0';
  size_t words = 0;
  char* current = malloc(sizeof(char) * (string_length + 1));
  current[0] = '\0';
  size_t current_index = 0;
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == ' ' || (string[index] == '-' && strlen(current) > 0)) {
      strcat(result, current);
      character_append(result, '-');
      memset(current, 0, sizeof(char) * (string_length + 1));
      current_index = 0;
      words += 1;
    } else {
      if (character_is_alphanumeric(string[index])) {
        current[current_index] = string[index];
        current_index += 1;
        current[current_index] = '\0';
      }
    }
  }
  strcat(result, current);
  free(current);
  return result;
}

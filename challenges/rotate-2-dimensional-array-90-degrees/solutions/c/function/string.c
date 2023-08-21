#include "string.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

char* string_copy(const char* string) {
  size_t source_length = string_get_length(string);
  char* copy = malloc(sizeof(char) * (source_length + 1));
  if (copy == NULL) {
    perror("Error (string_copy)");
    exit(EXIT_FAILURE);
  }
  size_t index;
  for (index = 0; index < source_length; index++) {
    copy[index] = string[index];
  }
  copy[index] = '\0';
  return copy;
}

char** string_split(const char* string, char separator, size_t* result_size) {
  size_t string_length = string_get_length(string);
  size_t index_string = 0;
  size_t index_current = 0;
  size_t index_result = 0;
  char* current = malloc(sizeof(char) * (string_length + 1));
  char** result = NULL;
  if (current == NULL) {
    perror("Error (string_split)");
    exit(EXIT_FAILURE);
  }
  while (index_string < string_length) {
    if (string[index_string] == separator) {
      current[index_current] = '\0';
      result = realloc(result, sizeof(char*) * (index_result + 1));
      if (result == NULL) {
        perror("Error (string_split)");
        exit(EXIT_FAILURE);
      }
      result[index_result] = string_copy(current);
      index_result++;
      index_current = 0;
    } else {
      current[index_current] = string[index_string];
      index_current++;
    }
    index_string++;
  }
  current[index_current] = '\0';
  result = realloc(result, sizeof(char*) * (index_result + 1));
  if (result == NULL) {
    perror("Error (string_split)");
    exit(EXIT_FAILURE);
  }
  result[index_result] = string_copy(current);
  free(current);
  *result_size = index_result + 1;
  return result;
}

#include "string.h"

size_t string_get_length(const char* string) {
  size_t length = 0;
  while (string[length] != '\0') {
    length++;
  }
  return length;
}

void string_to_uppercase(char* string) {
  size_t string_length = string_get_length(string);
  for (size_t index = 0; index < string_length; index++) {
    string[index] = character_to_upper(string[index]);
  }
  string[string_length] = '\0';
}

void string_remove_character(char* string, char search) {
  size_t string_length = string_get_length(string);
  for (size_t index = 0; index < string_length; index++) {
    if (string[index] == search) {
      for (size_t index_string = index; index_string < string_length; index_string++) {
        string[index_string] = string[index_string + 1];
      }
      string_length--;
      index--;
    }
  }
  string[string_length] = '\0';
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

void string_reverse(char* string) {
  size_t string_length = string_get_length(string);
  size_t index_start = 0;
  size_t index_end = string_length - 1;
  while (index_start < index_end) {
    char temporary = string[index_start];
    string[index_start] = string[index_end];
    string[index_end] = temporary;
    index_start++;
    index_end--;
  }
}

bool string_is_palindrome(char* string) {
  char* string_reversed = string_copy(string);
  string_reverse(string_reversed);
  bool is_palindrome = strcmp(string, string_reversed) == 0;
  free(string_reversed);
  return is_palindrome;
}

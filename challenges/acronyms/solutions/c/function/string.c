#include "string.h"

#include "character.h"

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

char* string_acronym(char* string) {
  size_t string_length = string_get_length(string);
  char* result = malloc(sizeof(char) * (string_length + 1));
  char current = '\0';
  size_t result_index = 0;
  bool is_first_character = true;
  for (size_t string_index = 0; string_index < string_length; string_index++) {
    if (string[string_index] == ' ') {
      result[result_index] = current;
      result_index += 1;
      is_first_character = true;
    } else if (is_first_character) {
      current = string[string_index];
      is_first_character = false;
    }
  }
  result[result_index] = current;
  result_index += 1;
  result[result_index] = '\0';
  return result;
}

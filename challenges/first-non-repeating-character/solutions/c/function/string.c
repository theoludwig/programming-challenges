#include "string.h"

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"

size_t string_total_occurrences_of_character(char* string, char character) {
  size_t result = 0;
  size_t string_length = strlen(string);
  for (size_t index = 0; index < string_length; index++) {
    char current_character = string[index];
    if (current_character == character) {
      result += 1;
    }
  }
  return result;
}

char string_first_non_repeating_character(char* string) {
  size_t string_length = strlen(string);
  char result = ""[0];
  for (size_t index = 0; index < string_length; index++) {
    char character = string[index];
    if (string_total_occurrences_of_character(string, character) == 1) {
      result = character;
      break;
    }
  }
  return result;
}

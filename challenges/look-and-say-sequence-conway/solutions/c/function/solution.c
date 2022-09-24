#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "character.h"
#include "input.h"

int main() {
  char* string = input();
  size_t string_length = strlen(string);
  char* result = malloc(sizeof(char*) * (string_length + 1));
  for (size_t index = 0; index < string_length; index++) {
    unsigned char number_of_appearances = 0;
    char value_to_search = string[index];
    size_t iteration = index;
    while (iteration < string_length && string[iteration] == value_to_search) {
      number_of_appearances++;
      iteration++;
    }
    char* number_of_appearances_string = malloc(sizeof(char*) * (string_length + 1));
    snprintf(number_of_appearances_string, sizeof(result), "%hhu", number_of_appearances);
    character_append_many(result, number_of_appearances_string);
    character_append(result, value_to_search);
    index += number_of_appearances - 1;
  }
  printf("%s\n", result);
  return EXIT_SUCCESS;
}

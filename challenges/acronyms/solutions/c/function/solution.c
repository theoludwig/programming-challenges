#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string_remove_character(string, '"');
  string_to_uppercase(string);
  char* result = string_acronym(string);
  printf("%s\n", result);
  free(string);
  free(result);
  return EXIT_SUCCESS;
}

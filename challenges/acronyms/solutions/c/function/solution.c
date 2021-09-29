#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string = string_replace(string, '"', '\0');
  string = string_to_upper(string);
  string = string_acronym(string);
  printf("%s\n", string);
  free(string);
  return EXIT_SUCCESS;
}

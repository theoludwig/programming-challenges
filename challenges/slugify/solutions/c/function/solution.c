#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string_trim(string, ' ');
  string_trim(string, '-');
  string_to_lowercase(string);
  char* result = string_slugify(string);
  printf("%s\n", result);
  free(string);
  free(result);
  return EXIT_SUCCESS;
}

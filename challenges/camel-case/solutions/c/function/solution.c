#include <stdio.h>
#include <stdlib.h>

#include "character.h"
#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  string_trim(string, ' ');
  char* result = string_camelCase(string);
  printf("%s\n", result);
  free(string);
  free(result);
  return EXIT_SUCCESS;
}

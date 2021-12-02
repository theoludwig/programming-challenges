#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#include "input.h"
#include "string.h"

int main() {
  char* string = input();
  char* string2 = input();
  bool is_preffix = string_starts_with(string, string2);
  bool is_suffix = string_ends_with(string, string2);
  free(string);
  free(string2);
  printf("%s\n", is_preffix ? "true" : "false");
  printf("%s\n", is_suffix ? "true" : "false");
  return EXIT_SUCCESS;
}
